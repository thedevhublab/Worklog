(() => {
  'use strict';
  const KEYS = { entries: 'harugirok.entries.v1', categories: 'harugirok.categories.v1', translations: 'harugirok.categoryTranslations.v1', language: 'harugirok.language', activeDate: 'harugirok.activeDate', analyticsIncludeRepeats: 'harugirok.analytics.includeRepeats.v1' };
  const DEFAULTS = ['기획', '회의', '개발', '디자인', '운영', '기타'];
  const BUILTIN = { '기획':'Planning', '회의':'Meetings', '개발':'Development', '디자인':'Design', '운영':'Operations', '기타':'Other' };
  const KO = {
    heroTitle:'업무 기록', heroDescription:'날짜별로 업무를 기록하고 관리하세요.',
    languageControls:'데이터 및 언어', statistics:'업무 통계', searchFilters:'기록 검색과 필터', add:'추가', home:'Worklog 홈', filePicker:'JSON 백업 파일 선택',
    currentMonthEntries:'이번 달 기록', allEntries:'전체 업무일지', loggedDays:'기록한 날짜', workEntries:'업무 기록', newEntry:'새 기록',
    sortBy:'정렬 기준', filterByCategory:'분류 필터', searchEntries:'기록 검색', searchPlaceholder:'기록 검색...', manageCategories:'분류 관리',
    newWorkEntry:'새 업무 기록', close:'닫기', date:'날짜', title:'업무 제목', titlePlaceholder:'예: 신규 서비스 기획안 작성',
    titleLimit:'최대 80자', details:'업무 내용', detailsPlaceholder:'오늘 진행한 업무와 결과를 기록해보세요.', detailsLimit:'최대 3,000자',
    category:'분류', timeSpent:'소요 시간 (시간)', hoursHint:'0~24시간 · 30분 단위', dateHint:'YYYY-MM-DD', previousMonth:'이전 달', nextMonth:'다음 달', cancel:'취소', saveEntry:'기록 저장',
    localSaveNote:'기록은 이 브라우저에 자동 저장됩니다.', export:'↓ 백업', import:'↑ 복원', categoryHelp:'한국어와 영어 분류명을 직접 입력하고 관리하세요.',
    koreanCategoryName:'한국어 분류명', englishCategoryName:'영어 분류명',
    categoryDeleteNote:'분류를 삭제해도 업무 기록은 보존되며 다른 분류로 이동합니다.',
    allCategories:'전체 분류', newest:'최신순', oldest:'오래된순', titleAZ:'제목순', entriesUnit:'건', daysUnit:'일', hoursUnit:'시간',
    status:'Status', statusMenu:'Status', allStatuses:'전체 기록', allMonths:'전체 기간', statusCreate:'Create', statusInProgress:'In Progress', statusComplete:'Complete', statusCancel:'Cancel', cancelStatusHint:'Cancel 상태도 기록에 저장되어 상태 메뉴에서 확인할 수 있습니다.', statusUpdated:'작업 상태를 변경했어요.', newDayPrompt:'날짜가 바뀌었어요. 오늘 날짜로 새 업무 기록을 작성할까요?', statusCreateLabel:'Create', statusInProgressLabel:'In Progress', statusCompleteLabel:'Complete', statusCancelLabel:'Cancel',
    weeklySummary:'주간 요약', previousWeek:'이전 주', nextWeek:'다음 주', thisWeek:'이번 주', weeklyEntries:'건', noWeeklyEntries:'이번 주에는 기록이 없어요.', dayEntries:'건', statusSummary:'상태별 요약', statusSummaryPeriod:'전체 · 선택 기간', analyticsHeading:'기록 통계', analyticsFilterLabel:'반복 기록 통계 포함 여부', analyticsAll:'전체 기록', analyticsExclude:'반복 기록 제외', analyticsMetrics:'통계 요약', analyticsEntryCount:'분석 기록', analyticsDayCount:'기록한 날짜', analyticsHours:'총 소요 시간', analyticsTrend:'월별 업무량 추이', analyticsTrendHint:'가로축은 날짜·월, 세로 막대는 기록 수입니다. 선택한 달은 일별, 전체 기간은 최근 12개월을 표시합니다.', analyticsCategories:'분류별 기록', analyticsCategoryHint:'분류명은 항목, 막대 길이와 숫자는 기록 수입니다.', analyticsStatuses:'상태별 기록', analyticsStatusHint:'상태명은 항목, 막대 길이와 숫자는 기록 수입니다.', analyticsEmpty:'표시할 기록이 없습니다.', analyticsNoData:'기록 없음', analyticsOther:'기타 분류', analyticsCountUnit:'건', analyticsHourUnit:'시간', analyticsDaySuffix:'일', analyticsTotal:'총 {count}건', analyticsRepeatYes:'반복', analyticsRepeatNo:'일반', deadline:'마감일 (선택)', deadlineHint:'마감일은 업무 날짜와 별도로 저장됩니다.', overdue:'기한 초과', repeatEnabled:'반복 일정으로 만들기', repeatHint:'종료일까지 반복 기록을 한 번에 생성합니다.', repeatSettings:'반복 설정', repeatFrequency:'반복 주기', repeatDaily:'매일', repeatWeekly:'매주', repeatBiweekly:'격주', repeatMonthly:'매월', repeatCustom:'요일 직접 선택', repeatWeekdayLabel:'반복할 요일', repeatWeekdayHint:'선택한 요일마다 기록을 만듭니다.', repeatChooseWeekdays:'요일을 하나 이상 선택하세요.', repeatNoWeekday:'반복할 요일을 하나 이상 선택하세요.', repeatNoMatches:'선택한 기간에 해당 요일이 없습니다.', repeatEndDate:'종료일', repeatEndHint:'시작일과 종료일을 포함해 기록을 생성합니다.', repeatPreview:'총 {count}개 기록이 생성됩니다.', repeatEndRequired:'반복 종료일을 선택하세요.', repeatEndBeforeStart:'종료일은 시작일과 같거나 이후여야 합니다.', repeatTooMany:'반복 기록이 500개를 넘습니다. 종료일을 앞당겨 주세요.', repeatSaved:'반복 기록 {count}개를 만들었어요.', csvExport:'CSV 내보내기', csvEmpty:'내보낼 기록이 없습니다.', csvSuccess:'CSV 파일을 내보냈어요.',
    edit:'수정', delete:'삭제', rename:'이름 저장', noCategories:'등록된 분류가 없습니다. 분류를 추가해보세요.',
    noEntries:'아직 기록이 없어요', noEntriesHint:'오늘 한 일을 첫 업무 기록으로 남겨보세요.',
    noMonthEntries:'이 달에는 기록이 없어요', noMonthHint:'다른 달을 선택하거나 새 기록을 추가해보세요.',
    noResults:'검색 결과가 없어요', noResultsHint:'검색어나 필터 조건을 바꿔보세요.', noDetails:'내용이 입력되지 않았습니다.',
    editEntry:'기록 수정', saveChanges:'수정 저장', entryUpdated:'기록을 수정했어요.', entrySaved:'업무 기록을 저장했어요.', deadlineInvalid:'유효한 마감일을 선택하세요.',
    entryDeleted:'기록을 삭제했어요.', categoryAdded:'분류를 추가했어요.', categoryRenamed:'분류 이름을 변경했어요.',
    categoryDeleted:'분류를 삭제했어요.', categoryBothRequired:'한국어와 영어 이름을 모두 입력하세요.',
    categoryDuplicate:'이미 등록된 한국어 분류명이에요.', categoryDeleteLast:'분류는 최소 1개 이상 있어야 합니다.',
    categoryRenameDuplicate:'다른 분류와 한국어 이름이 겹칩니다.', titleRequired:'업무 제목을 입력하세요.',
    titleTooLong:'제목은 80자 이하여야 합니다.', dateInvalid:'유효한 날짜를 선택하세요.',
    detailsTooLong:'내용은 3,000자 이하여야 합니다.', hoursInvalid:'소요 시간은 0~24시간, 30분 단위로 입력하세요.',
    saveFailed:'저장하지 못했습니다. 브라우저 저장 공간을 확인한 뒤 다시 시도하세요.',
    storageUnreadable:'일부 저장 데이터를 읽지 못했습니다. 원본 보호를 위해 변경을 막았습니다.',
    importSuccess:'백업 데이터를 가져왔어요.', importBadFile:'백업 파일이 올바르지 않거나 읽을 수 없습니다.',
    importTooLarge:'파일이 너무 큽니다. 10MB 이하의 JSON 파일을 선택하세요.',
    exportSuccess:'JSON 백업 파일을 저장했어요.', selectMonth:'월 선택', previousYear:'이전 연도', nextYear:'다음 연도',
    englishMissing:'영어 이름 미등록', selectDate:'날짜 선택', selected:'선택됨'
  };
  const EN = {
    heroTitle:'Work log',
    languageControls:'Data and language', statistics:'Work statistics', searchFilters:'Search and filter entries', add:'Add', home:'Worklog home', filePicker:'Choose a JSON backup file',
    heroDescription:'Record and manage your work by date.',
    currentMonthEntries:'This month', allEntries:'All entries', loggedDays:'Days logged', workEntries:'Work journal',
    newEntry:'New entry', sortBy:'Sort by', filterByCategory:'Filter by category', searchEntries:'Search entries',
    searchPlaceholder:'Search entries...', manageCategories:'Manage categories', newWorkEntry:'New work entry', close:'Close',
    date:'Date', title:'Title', titlePlaceholder:'e.g. Draft a new service proposal', titleLimit:'Up to 80 characters',
    details:'Details', detailsPlaceholder:'Describe what you worked on and the results.', detailsLimit:'Up to 3,000 characters',
    category:'Category', timeSpent:'Time spent (hours)', hoursHint:'0–24 hours · 30-minute increments', dateHint:'Enter date as YYYY-MM-DD', previousMonth:'Previous month', nextMonth:'Next month', cancel:'Cancel',
    saveEntry:'Save entry', localSaveNote:'Entries are saved in this browser.',
    export:'↓ Export', import:'↑ Import', categoryHelp:'Enter and manage category names in Korean and English.',
    koreanCategoryName:'Korean category name', englishCategoryName:'English category name',
    categoryDeleteNote:'Deleting a category keeps its entries and moves them to another category.',
    allCategories:'All categories', newest:'Newest first', oldest:'Oldest first', titleAZ:'Title A–Z',
    status:'Status', statusMenu:'Status', allStatuses:'All entries', allMonths:'All time', statusCreate:'Create', statusInProgress:'In Progress', statusComplete:'Complete', statusCancel:'Cancel', cancelStatusHint:'Cancelled entries stay saved and are available in the Cancel status view.', statusUpdated:'Work status updated.', newDayPrompt:'A new day has started. Would you like to create a work entry for today?', statusCreateLabel:'Create', statusInProgressLabel:'In Progress', statusCompleteLabel:'Complete', statusCancelLabel:'Cancel',
    weeklySummary:'Weekly summary', previousWeek:'Previous week', nextWeek:'Next week', thisWeek:'This week', weeklyEntries:'entries', noWeeklyEntries:'No entries for this week.', dayEntries:'entries', statusSummary:'Status summary', statusSummaryPeriod:'All time · selected month', analyticsHeading:'Entry analytics', analyticsFilterLabel:'Include recurring entries in analytics', analyticsAll:'All entries', analyticsExclude:'Exclude recurring', analyticsMetrics:'Analytics summary', analyticsEntryCount:'Entries analyzed', analyticsDayCount:'Days logged', analyticsHours:'Total time spent', analyticsTrend:'Monthly workload trend', analyticsTrendHint:'Dates or months run across the chart; bar height shows entry count. A selected month shows days, and all time shows the latest 12 months.', analyticsCategories:'Entries by category', analyticsCategoryHint:'Category names label each row; bar length and value show entry count.', analyticsStatuses:'Entries by status', analyticsStatusHint:'Status names label each row; bar length and value show entry count.', analyticsEmpty:'No entries to show for this period.', analyticsNoData:'No entries', analyticsOther:'Other categories', analyticsCountUnit:'entries', analyticsHourUnit:'hours', analyticsDaySuffix:'days', analyticsTotal:'{count} entries total', analyticsRepeatYes:'Recurring', analyticsRepeatNo:'Regular', deadline:'Deadline (optional)', deadlineHint:'The deadline is stored separately from the work date.', overdue:'Overdue', repeatEnabled:'Repeat this entry', repeatHint:'Create all repeated entries through the end date when you save.', repeatSettings:'Repeat settings', repeatFrequency:'Frequency', repeatDaily:'Every day', repeatWeekly:'Weekly', repeatBiweekly:'Every 2 weeks', repeatMonthly:'Monthly', repeatCustom:'Choose weekdays', repeatWeekdayLabel:'Repeat on', repeatWeekdayHint:'Create an entry on each selected weekday.', repeatChooseWeekdays:'Choose one or more weekdays.', repeatNoWeekday:'Select at least one weekday.', repeatNoMatches:'No selected weekdays fall within this date range.', repeatEndDate:'End date', repeatEndHint:'Entries are created for the start and end dates when they match the schedule.', repeatPreview:'{count} entries will be created.', repeatEndRequired:'Choose an end date for the repeat schedule.', repeatEndBeforeStart:'The end date must be on or after the start date.', repeatTooMany:'The schedule exceeds 500 entries. Choose an earlier end date.', repeatSaved:'Created {count} repeated entries.', csvExport:'Export CSV', csvEmpty:'There are no entries to export.', csvSuccess:'CSV file exported.',
    entriesUnit:'entries', daysUnit:'days', hoursUnit:'hours', edit:'Edit', delete:'Delete', rename:'Save names',
    noCategories:'No categories yet. Add one to get started.', noEntries:'No entries yet',
    noEntriesHint:'Add your first work entry for today.', noMonthEntries:'No entries for this month',
    noMonthHint:'Choose another month or add a new entry.', noResults:'No results found',
    noResultsHint:'Try changing your search or filters.', noDetails:'No details provided.',
    editEntry:'Edit entry', saveChanges:'Save changes', entryUpdated:'Entry updated.', entrySaved:'Entry saved.', deadlineInvalid:'Choose a valid deadline.',
    entryDeleted:'Entry deleted.', categoryAdded:'Category added.', categoryRenamed:'Category names updated.',
    categoryDeleted:'Category deleted.', categoryBothRequired:'Enter both Korean and English names.',
    categoryDuplicate:'That Korean category name is already used.', categoryDeleteLast:'Keep at least one category.',
    categoryRenameDuplicate:'Those Korean names are already in use.', titleRequired:'Enter a title.',
    titleTooLong:'The title must be 80 characters or fewer.', dateInvalid:'Choose a valid date.',
    detailsTooLong:'Details must be 3,000 characters or fewer.',
    hoursInvalid:'Enter time from 0 to 24 hours in 30-minute increments.',
    saveFailed:'Could not save. Check browser storage and try again.',
    storageUnreadable:'Some saved data could not be read. Changes are disabled to protect existing data.',
    importSuccess:'Backup imported.', importBadFile:'The backup is invalid or could not be read.',
    importTooLarge:'File is too large. Choose a JSON file under 10 MB.',
    exportSuccess:'JSON backup downloaded.', selectMonth:'Select month', previousYear:'Previous year',
    nextYear:'Next year', englishMissing:'English name not set', selectDate:'Choose a date', selected:'Selected'
  };
  const $ = id => document.getElementById(id);
  const state = { entries:[], categories:[...DEFAULTS], translations:{}, language:'ko', selectedStatus:'all', weekStart:null, formMode:'new', storageProblem:false, pickerYear:new Date().getFullYear(), calendarDate:new Date(), snapshot:null, focus:null, saving:false, analyticsIncludeRepeats:true };
  const dict = () => state.language === 'ko' ? KO : EN;
  const t = key => dict()[key] || key;
  const locale = () => state.language === 'ko' ? 'ko-KR' : 'en-US';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localDate = date => date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
  const dateFromISO = value => {const [y,m,d]=value.split('-').map(Number);return new Date(y,m-1,d);};
  const addDays = (value,amount) => {const date=dateFromISO(value);date.setDate(date.getDate()+amount);return localDate(date);};
  const daysBetween = (start,end) => {const [sy,sm,sd]=start.split('-').map(Number),[ey,em,ed]=end.split('-').map(Number);return (Date.UTC(ey,em-1,ed)-Date.UTC(sy,sm-1,sd))/86400000;};
  const mondayOf = date => {const day=new Date(date.getFullYear(),date.getMonth(),date.getDate());day.setDate(day.getDate()-((day.getDay()+6)%7));return localDate(day);};
  const validDate = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const p=value.split('-').map(Number),d=new Date(p[0],p[1]-1,p[2]);
    return d.getFullYear()===p[0] && d.getMonth()===p[1]-1 && d.getDate()===p[2];
  };
  const MAX_REPEAT_ENTRIES=500;
  const recurrenceDates=(start,end,frequency,weekdays=[])=>{
    if(!validDate(start)||!validDate(end)||end<start)return null;
    const dates=frequency==='custom'?[]:[start];
    if(frequency==='daily'){
      let next=addDays(start,1);
      while(next<=end){dates.push(next);if(dates.length>MAX_REPEAT_ENTRIES)return null;next=addDays(next,1);}
    }else if(frequency==='custom'){
      const selected=new Set(weekdays.map(Number));if(!selected.size)return [];
      for(let next=start;next<=end;next=addDays(next,1)){
        const weekday=(dateFromISO(next).getDay()+6)%7+1;
        if(selected.has(weekday)){dates.push(next);if(dates.length>MAX_REPEAT_ENTRIES)return null;}
      }
    }else if(frequency==='weekly'||frequency==='biweekly'){
      const datesForCycle=[...dates];
      const step=frequency==='weekly'?7:14;let next=addDays(start,step);
      while(next<=end){datesForCycle.push(next);if(datesForCycle.length>MAX_REPEAT_ENTRIES)return null;next=addDays(next,step);}
      return datesForCycle;
    }else if(frequency==='monthly'){
      const [year,month,day]=start.split('-').map(Number);
      for(let offset=1;;offset++){
        const first=new Date(year,month-1+offset,1),lastDay=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
        const next=localDate(new Date(first.getFullYear(),first.getMonth(),Math.min(day,lastDay)));
        if(next>end)break;dates.push(next);if(dates.length>MAX_REPEAT_ENTRIES)return null;
      }
    }else return null;
    return dates;
  };
  const selectAnalyticsEntries=(entries,includeRepeats)=>includeRepeats?entries:entries.filter(row=>row.isRecurring!==true);
  const normalizeHours = value => {
    if (value === '' || value == null) return '';
    const n=Number(value);
    return Number.isFinite(n)&&n>=0&&n<=24&&Number.isInteger(n*2) ? String(n) : null;
  };
  let storage=null;
  try { storage=window.localStorage; } catch { state.storageProblem=true; }
  const readJson=(key,fallback)=>{try{const raw=storage&&storage.getItem(key);return {value:raw==null?fallback:JSON.parse(raw),bad:false};}catch{return {value:fallback,bad:true};}};
  const normalizeEntries=list=>{
    if(!Array.isArray(list))return null;
    const ids=new Set(),result=[];
    for(const row of list){
      if(!row||typeof row!=='object'||Array.isArray(row))return null;
      const title=typeof row.title==='string'?row.title.trim():'',content=row.content==null?'':row.content,category=row.category==null?'':row.category,hours=normalizeHours(row.hours),status=row.status==null?'create':row.status,deadline=row.deadline==null?'':row.deadline,isRecurring=row.isRecurring===true,recurrenceId=row.recurrenceId==null?'':row.recurrenceId;
      if(!validDate(row.date)||!title||title.length>80||typeof content!=='string'||content.length>3000||typeof category!=='string'||category.length>64||hours===null||!['create','inProgress','complete','cancel'].includes(status)||(deadline!==''&&!validDate(deadline))||(row.isRecurring!==undefined&&typeof row.isRecurring!=='boolean')||typeof recurrenceId!=='string'||recurrenceId.length>160||(isRecurring&&!recurrenceId)||(!isRecurring&&recurrenceId))return null;
      let id=row.id==null?'':String(row.id);
      if(id.length>160||(id&&ids.has(id)))return null;
      if(!id){do{id=globalThis.crypto&&typeof globalThis.crypto.randomUUID==='function'?globalThis.crypto.randomUUID():'worklog-'+Date.now()+'-'+Math.random().toString(36).slice(2);}while(ids.has(id));}
      ids.add(id);
      const created=Number(row.created);
      result.push({id,date:row.date,title,content,category:category.trim(),hours,status,deadline,isRecurring,recurrenceId,created:Number.isFinite(created)&&created>0?created:Date.now()});
    }
    return result;
  };
  const normalizeCategories=value=>{
    if(!Array.isArray(value))return null;
    const out=[],seen=new Set();
    for(const item of value){if(typeof item!=='string'||!item.trim()||item.trim().length>64)return null;const name=item.trim(),key=name.toLocaleLowerCase();if(!seen.has(key)){seen.add(key);out.push(name);}}
    return out;
  };
  const normalizeTranslations=value=>{
    if(!value||typeof value!=='object'||Array.isArray(value))return null;
    const out={};
    for(const [key,label] of Object.entries(value)){if(!key.trim()||key.length>64||typeof label!=='string'||label.trim().length>64)return null;out[key]=label.trim();}
    return out;
  };
  const load=()=>{
    if(!storage){state.storageProblem=true;return;}
    const e=readJson(KEYS.entries,[]),c=readJson(KEYS.categories,[...DEFAULTS]),tr=readJson(KEYS.translations,{});
    const entries=normalizeEntries(e.value),categories=normalizeCategories(c.value),translations=normalizeTranslations(tr.value);
    const analyticsPreference=readJson(KEYS.analyticsIncludeRepeats,true);
    state.analyticsIncludeRepeats=analyticsPreference.bad?true:analyticsPreference.value!==false;
    state.storageProblem=Boolean(e.bad||c.bad||tr.bad||!entries||!categories||!translations);
    state.entries=entries||[];state.categories=categories||[...DEFAULTS];state.translations=translations||{};
    state.entries.forEach(row=>{if(row.category&&!state.categories.includes(row.category))state.categories.push(row.category);});
    state.language=readJson(KEYS.language,'ko').value==='en'?'en':'ko';
  };
  load();
  const persist=next=>{
    if(!storage||state.storageProblem)throw Error('storage unavailable');
    const values={[KEYS.entries]:JSON.stringify(next.entries),[KEYS.categories]:JSON.stringify(next.categories),[KEYS.translations]:JSON.stringify(next.translations)},before={};
    Object.keys(values).forEach(key=>before[key]=storage.getItem(key));
    try{Object.entries(values).forEach(([key,value])=>storage.setItem(key,value));}
    catch(error){Object.entries(before).forEach(([key,value])=>{try{value==null?storage.removeItem(key):storage.setItem(key,value);}catch{}});throw error;}
    state.entries=next.entries;state.categories=next.categories;state.translations=next.translations;
  };
  let today=new Date();
  const todayISO=localDate(today);
  state.weekStart=mondayOf(today);
  let promptForNewDay=false;
  try{
    const previousActiveDate=storage&&storage.getItem(KEYS.activeDate);
    promptForNewDay=Boolean(validDate(previousActiveDate)&&previousActiveDate<todayISO);
    if(storage)storage.setItem(KEYS.activeDate,todayISO);
  }catch{}
  $('monthFilter').value=localDate(today).slice(0,7);$('entryDate').value=localDate(today);state.pickerYear=today.getFullYear();
  let toastTimer;
  const toast=message=>{$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2600);};
  const categoryLabel=name=>state.language==='en'?(state.translations[name]||BUILTIN[name]||name):name;
  const countEntries=count=>state.language==='en'&&count===1?'entry':t('entriesUnit');
  const countDays=count=>state.language==='en'&&count===1?'day':t('daysUnit');
  const monthText=value=>{const p=value.split('-').map(Number);return new Date(p[0],p[1]-1,1).toLocaleDateString(locale(),{year:'numeric',month:'long'});};
  const dateText=value=>{const p=value.split('-').map(Number);return new Date(p[0],p[1]-1,p[2]).toLocaleDateString(locale(),{year:'numeric',month:'short',day:'numeric'});};
  const renderCategories=selected=>{
    const filterValue=$('categoryFilter').value,previous=selected===undefined?$('entryCategory').value:selected;
    $('categoryFilter').innerHTML='<option value="">'+esc(t('allCategories'))+'</option>'+state.categories.map(name=>'<option value="'+esc(name)+'">'+esc(categoryLabel(name))+'</option>').join('');
    if(state.categories.includes(filterValue))$('categoryFilter').value=filterValue;
    $('entryCategory').innerHTML=state.categories.map(name=>'<option value="'+esc(name)+'">'+esc(categoryLabel(name))+'</option>').join('');
    if(state.categories.includes(previous))$('entryCategory').value=previous;
  };
  const renderMonthGrid=()=>{
    $('monthYearLabel').textContent=state.language==='ko'?state.pickerYear+'년':String(state.pickerYear);
    $('previousYear').setAttribute('aria-label',t('previousYear'));$('nextYear').setAttribute('aria-label',t('nextYear'));
    $('monthGrid').innerHTML=Array.from({length:12},(_,i)=>{
      const value=state.pickerYear+'-'+String(i+1).padStart(2,'0'),label=new Date(state.pickerYear,i,1).toLocaleDateString(locale(),{month:'short'}),selected=value===$('monthFilter').value;
      return '<button type="button" class="month-option'+(selected?' selected':'')+'" data-month="'+value+'" aria-pressed="'+selected+'">'+esc(label)+'</button>';
    }).join('');
  };
  const isoForDate=date=>localDate(date);
  const dateLabel=value=>{
    if(!validDate(value))return value;
    const p=value.split('-').map(Number);
    return new Date(p[0],p[1]-1,p[2]).toLocaleDateString(locale(),{year:'numeric',month:'long',day:'numeric',weekday:'long'});
  };
  const statusItems=[['create','statusCreate'],['inProgress','statusInProgress'],['complete','statusComplete'],['cancel','statusCancel']];
  const countByStatus=entries=>entries.reduce((counts,row)=>{counts[row.status]=(counts[row.status]||0)+1;return counts;},{create:0,inProgress:0,complete:0,cancel:0});
  const statusLabel=status=>t(statusItems.find(([value])=>value===status)?.[1]||'statusCreate');
  const analyticsEntries=()=>selectAnalyticsEntries(state.entries,state.analyticsIncludeRepeats);
  const renderAnalyticsFilter=()=>{
    [['includeRepeatsBtn',true],['excludeRepeatsBtn',false]].forEach(([id,value])=>{
      const button=$(id),active=state.analyticsIncludeRepeats===value;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
    });
  };
  const renderStatusSummary=()=>{
    const entries=analyticsEntries(),all=countByStatus(entries),month=$('monthFilter').value,period=month?entries.filter(row=>row.date.startsWith(month)):entries,periodCounts=countByStatus(period);
    $('statusSummaryPeriod').textContent=month?t('allMonths')+' · '+monthText(month):t('allMonths');
    $('statusSummary').innerHTML=statusItems.map(([value,key])=>'<button class="status-summary-card status-'+value+'" type="button" data-summary-status="'+value+'" aria-label="'+esc(statusLabel(value)+': '+all[value]+' · '+periodCounts[value])+'"><span class="status-summary-name">'+esc(t(key))+'</span><strong>'+all[value]+'</strong><span class="status-summary-detail">'+esc(String(periodCounts[value]))+' '+esc(countEntries(periodCounts[value]))+'</span></button>').join('');
  };
  const renderChartRows=(container,rows)=>{
    if(!rows.length||rows.every(row=>row.count===0)){$(container).innerHTML='<p class="chart-empty">'+esc(t('analyticsEmpty'))+'</p>';return;}
    const maximum=Math.max(1,...rows.map(row=>row.count));
    $(container).innerHTML=rows.map(row=>'<div class="chart-row" role="listitem" aria-label="'+esc(row.label+': '+row.count+' '+t('analyticsCountUnit'))+'"><span class="chart-label" title="'+esc(row.label)+'">'+esc(row.label)+'</span><span class="chart-track" aria-hidden="true"><span style="width:'+Math.max(row.count?3:0,row.count/maximum*100)+'%"></span></span><strong class="chart-value">'+row.count+'</strong></div>').join('');
  };
  const renderTrendChart=rows=>{
    if(!rows.some(row=>row.count>0)){$('trendChart').innerHTML='<p class="chart-empty">'+esc(t('analyticsEmpty'))+'</p>';return;}
    const maximum=Math.max(1,...rows.map(row=>row.count));
    $('trendChart').innerHTML=rows.map(row=>'<div class="trend-column" role="listitem" aria-label="'+esc(row.fullLabel+': '+row.count+' '+t('analyticsCountUnit'))+'" title="'+esc(row.fullLabel+': '+row.count)+'"><span class="trend-value">'+row.count+'</span><span class="trend-track" aria-hidden="true"><span style="height:'+Math.max(row.count?3:0,row.count/maximum*100)+'%"></span></span><span class="trend-label" aria-hidden="true">'+esc(row.label)+'</span></div>').join('');
  };
  const renderAnalytics=()=>{
    const entries=analyticsEntries(),month=$('monthFilter').value,periodEntries=month?entries.filter(row=>row.date.startsWith(month)):entries;
    const days=new Set(periodEntries.map(row=>row.date)).size,totalHours=periodEntries.reduce((sum,row)=>sum+(row.hours===''?0:Number(row.hours)),0);
    $('analyticsEntryCount').textContent=String(periodEntries.length)+' '+t('analyticsCountUnit');
    $('analyticsDayCount').textContent=String(days)+' '+(state.language==='ko'?t('daysUnit'):t('analyticsDaySuffix'));
    $('analyticsHours').textContent=totalHours.toLocaleString(locale(),{maximumFractionDigits:1})+' '+t('analyticsHourUnit');
    $('analyticsRange').textContent=month?monthText(month):t('allMonths');

    let trend=[];
    if(month){
      const [year,monthNumber]=month.split('-').map(Number),daysInMonth=new Date(year,monthNumber,0).getDate(),counts=new Map();
      periodEntries.forEach(row=>counts.set(Number(row.date.slice(-2)),(counts.get(Number(row.date.slice(-2)))||0)+1));
      trend=Array.from({length:daysInMonth},(_,index)=>{const day=index+1;return {label:String(day),fullLabel:state.language==='ko'?day+t('analyticsDaySuffix'):dateLabel(year+'-'+String(monthNumber).padStart(2,'0')+'-'+String(day).padStart(2,'0')),count:counts.get(day)||0};});
    }else{
      const endMonth=localDate(today).slice(0,7),[endYear,endMonthNum]=endMonth.split('-').map(Number);
      const months=Array.from({length:12},(_,index)=>new Date(endYear,endMonthNum-1-(11-index),1));
      const counts=new Map();entries.forEach(row=>counts.set(row.date.slice(0,7),(counts.get(row.date.slice(0,7))||0)+1));
      trend=months.map(date=>{const key=localDate(date).slice(0,7),label=date.toLocaleDateString(locale(),{month:'short'});return {label,fullLabel:monthText(key),count:counts.get(key)||0};});
    }
    renderTrendChart(trend);
    const categoryCounts=new Map();periodEntries.forEach(row=>categoryCounts.set(row.category,(categoryCounts.get(row.category)||0)+1));
    const rankedCategories=[...categoryCounts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],locale()));
    let categoryRows=rankedCategories.slice(0,8).map(([name,count])=>({label:categoryLabel(name),count}));
    if(rankedCategories.length>8)categoryRows.push({label:t('analyticsOther'),count:rankedCategories.slice(8).reduce((sum,item)=>sum+item[1],0)});
    renderChartRows('categoryChart',categoryRows);
    const statuses=countByStatus(periodEntries);
    renderChartRows('statusChart',statusItems.map(([status])=>({label:statusLabel(status),count:statuses[status]})));
  };
  const renderWeekly=()=>{
    const start=state.weekStart||mondayOf(today),end=addDays(start,6),rows=state.entries.filter(row=>row.date>=start&&row.date<=end).sort((a,b)=>a.date.localeCompare(b.date)||a.created-b.created),counts=countByStatus(rows);
    $('weeklyRange').textContent=dateLabel(start)+' – '+dateLabel(end);
    $('weeklyCount').textContent=String(rows.length);
    $('weeklyStatusSummary').innerHTML=statusItems.map(([value,key])=>'<span class="weekly-status-item"><span>'+esc(t(key))+'</span><strong>'+counts[value]+'</strong></span>').join('');
    if(!rows.length){$('weeklyEntries').innerHTML='<p class="weekly-empty">'+esc(t('noWeeklyEntries'))+'</p>';return;}
    const days=[...new Set(rows.map(row=>row.date))];
    $('weeklyEntries').innerHTML=days.map(date=>'<section class="weekly-day"><h3><time datetime="'+date+'">'+esc(dateLabel(date))+'</time><span>'+rows.filter(row=>row.date===date).length+' '+esc(t('dayEntries'))+'</span></h3>'+rows.filter(row=>row.date===date).map(row=>'<article class="weekly-entry"><div><strong>'+esc(row.title)+'</strong><p>'+esc(row.content||t('noDetails'))+'</p><div class="meta"><span class="status-pill status-'+esc(row.status)+'">'+esc(statusLabel(row.status))+'</span><span class="tag">'+esc(categoryLabel(row.category))+'</span>'+(row.deadline?'<span class="time">'+esc(t('due'))+': '+esc(dateLabel(row.deadline))+'</span>':'')+'</div></div></article>').join('')+'</section>').join('');
  };
  const renderCalendar=()=>{
    const year=state.calendarDate.getFullYear(),month=state.calendarDate.getMonth();
    $('calendarMonthLabel').textContent=new Date(year,month,1).toLocaleDateString(locale(),{year:'numeric',month:'long'});
    $('previousCalendarMonth').setAttribute('aria-label',t('previousMonth'));
    $('nextCalendarMonth').setAttribute('aria-label',t('nextMonth'));
    $('dateTrigger').setAttribute('aria-label',t('selectDate'));
    $('datePopup').setAttribute('aria-label',t('selectDate'));
    $('calendarWeekdays').innerHTML=Array.from({length:7},(_,i)=>'<span class="calendar-weekday">'+esc(new Date(2023,0,1+i).toLocaleDateString(locale(),{weekday:'short'}))+'</span>').join('');
    const first=new Date(year,month,1),start=new Date(year,month,1-first.getDay()),selected=$('entryDate').value,todayISO=localDate(today);
    $('calendarGrid').innerHTML=Array.from({length:42},(_,i)=>{
      const day=new Date(start.getFullYear(),start.getMonth(),start.getDate()+i),value=isoForDate(day),outside=day.getMonth()!==month;
      const classes=['calendar-day'];if(outside)classes.push('outside-month');if(value===todayISO)classes.push('today');if(value===selected)classes.push('selected');
      return '<button class="'+classes.join(' ')+'" type="button" data-calendar-date="'+value+'" aria-label="'+esc(dateLabel(value)+(value===selected?' · '+t('selected'):''))+'"'+(value===todayISO?' aria-current="date"':'')+'>'+day.getDate()+'</button>';
    }).join('');
  };
  const closeCalendar=restore=>{$('datePopup').hidden=true;$('dateTrigger').setAttribute('aria-expanded','false');if(restore)$('dateTrigger').focus();};
  const updateMonth=()=>{const value=$('monthFilter').value;if(!value){$('monthTrigger').textContent=t('allMonths');state.pickerYear=today.getFullYear();renderMonthGrid();return;}if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(value))return;$('monthTrigger').textContent=monthText(value);state.pickerYear=Number(value.slice(0,4));renderMonthGrid();};
  const renderCategoryList=()=>{
    $('categoryList').innerHTML=state.categories.length?state.categories.map((name,i)=>{
      const english=state.translations[name]||BUILTIN[name]||'',labelKo=(state.language==='ko'?'한국어 이름: ':'Korean name: ')+name,labelEn=(state.language==='ko'?'영어 이름: ':'English name: ')+(english||t('englishMissing'));
      return '<div class="category-row" data-category-row="'+i+'"><div class="category-row-fields"><label class="visually-hidden" for="category-ko-'+i+'">'+esc(labelKo)+'</label><input class="field" id="category-ko-'+i+'" data-category-ko maxlength="24" value="'+esc(name)+'" aria-label="'+esc(labelKo)+'"><label class="visually-hidden" for="category-en-'+i+'">'+esc(labelEn)+'</label><input class="field" id="category-en-'+i+'" data-category-en maxlength="24" value="'+esc(english)+'" placeholder="'+esc(t('englishCategoryName'))+'" aria-label="'+esc(labelEn)+'"></div><div class="category-row-actions"><button class="btn compact" type="button" data-save-category="'+i+'">'+esc(t('rename'))+'</button><button class="btn compact danger" type="button" data-delete-category="'+i+'" aria-label="'+esc(t('delete')+': '+name)+'">'+esc(t('delete'))+'</button></div></div>';
    }).join(''):'<div class="category-empty">'+esc(t('noCategories'))+'</div>';
  };
  const renderEmpty=filtered=>{const hasAny=state.entries.length>0,title=filtered?t('noResults'):hasAny?t('noMonthEntries'):t('noEntries'),hint=filtered?t('noResultsHint'):hasAny?t('noMonthHint'):t('noEntriesHint');$('entries').innerHTML='<div class="empty"><div class="emoji" aria-hidden="true">'+(filtered?'🔎':'📝')+'</div><strong>'+esc(title)+'</strong><p>'+esc(hint)+'</p></div>';};
  const renderStatusMenu=()=>{
    const counts={all:state.entries.length,create:0,inProgress:0,complete:0,cancel:0};
    state.entries.forEach(row=>{counts[row.status]=(counts[row.status]||0)+1;});
    document.querySelectorAll('[data-status-count]').forEach(element=>{element.textContent=String(counts[element.dataset.statusCount]||0);});
    document.querySelectorAll('[data-status-view]').forEach(button=>{const active=button.dataset.statusView===state.selectedStatus;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'page':'false');});
  };
  const filteredEntries=()=>{
    const month=$('monthFilter').value,category=$('categoryFilter').value,query=$('search').value.trim(),needle=query.toLocaleLowerCase(locale());
    const shown=state.entries.filter(row=>(!month||row.date.startsWith(month))&&(state.selectedStatus==='all'||row.status===state.selectedStatus)&&(!category||row.category===category)&&(!needle||(row.title+' '+row.content+' '+row.category+' '+categoryLabel(row.category)).toLocaleLowerCase(locale()).includes(needle)));
    const collator=new Intl.Collator(state.language==='ko'?'ko':'en',{sensitivity:'base',numeric:true});
    shown.sort((a,b)=>$('sortFilter').value==='old'?a.date.localeCompare(b.date)||a.created-b.created:$('sortFilter').value==='title'?collator.compare(a.title,b.title)||b.date.localeCompare(a.date):b.date.localeCompare(a.date)||b.created-a.created);
    return shown;
  };
  const exportCSV=()=>{
    const rows=filteredEntries();if(!rows.length){toast(t('csvEmpty'));return;}
    const headers=state.language==='ko'?['날짜','제목','업무 내용','분류','상태','소요 시간','마감일','반복 여부']:['Date','Title','Details','Category','Status','Time spent','Deadline','Recurring'];
    const cell=value=>'"'+String(value==null?'':value).replace(/"/g,'""')+'"';
    const data=[headers,...rows.map(row=>[row.date,row.title,row.content,categoryLabel(row.category),statusLabel(row.status),row.hours===''?'':String(row.hours),row.deadline||'',t(row.isRecurring?'analyticsRepeatYes':'analyticsRepeatNo')])].map(line=>line.map(cell).join(',')).join('\r\n');
    const blob=new Blob(['\uFEFF',data],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download='Worklog_'+localDate(today)+'.csv';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(t('csvSuccess'));
  };
  const render=()=>{
    renderStatusMenu();renderCategories();renderStatusSummary();renderAnalytics();renderWeekly();const month=$('monthFilter').value,category=$('categoryFilter').value,query=$('search').value.trim(),shown=filteredEntries();
    $('resultCount').textContent=shown.length+' '+countEntries(shown.length);
    const statsEntries=analyticsEntries(),monthCount=statsEntries.filter(row=>row.date.startsWith(localDate(today).slice(0,7))).length;
    $('monthCount').innerHTML=monthCount+'<small>'+esc(countEntries(monthCount))+'</small>';
    $('allCount').innerHTML=statsEntries.length+'<small>'+esc(countEntries(statsEntries.length))+'</small>';
    const dayCount=new Set(statsEntries.map(row=>row.date)).size;$('dayCount').innerHTML=dayCount+'<small>'+esc(countDays(dayCount))+'</small>';
    document.querySelector('[data-i18n="currentMonthEntries"]').textContent=t('currentMonthEntries')+' · '+monthText(localDate(today).slice(0,7));
    const summary=[month?monthText(month):t('allMonths')];if(state.selectedStatus!=='all')summary.push(t('status'+(state.selectedStatus==='inProgress'?'InProgress':state.selectedStatus==='complete'?'Complete':state.selectedStatus==='cancel'?'Cancel':'Create')));if(category)summary.push(categoryLabel(category));if(query)summary.push('“'+query+'”');
    $('filterSummary').textContent=state.storageProblem?t('storageUnreadable'):((category||query||state.selectedStatus!=='all'||!month)?summary.join(' · '):'');$('filterSummary').classList.toggle('warning-text',state.storageProblem);
    if(!shown.length){renderEmpty(Boolean(category||query||state.selectedStatus!=='all'));return;}
    $('entries').innerHTML=shown.map(row=>{
      const p=row.date.split('-'),day=Number(p[2]),d=new Date(Number(p[0]),Number(p[1])-1,day);
      const statusOptions=statusItems.map(([value,key])=>'<option value="'+value+'"'+(row.status===value?' selected':'')+'>'+esc(t(key))+'</option>').join('');
      const overdue=row.deadline&&row.deadline<localDate(today)&&!['complete','cancel'].includes(row.status);
      const deadline=row.deadline?'<span class="deadline-tag'+(overdue?' overdue':'')+'">'+esc(t(overdue?'overdue':'due'))+': '+esc(dateText(row.deadline))+'</span>':'';
      return '<article class="entry"><div class="daybox"><b>'+day+'</b><span>'+esc(d.toLocaleDateString(locale(),{month:'short'}))+' · '+esc(d.toLocaleDateString(locale(),{weekday:'short'}))+'</span></div><div class="entry-main"><h3>'+esc(row.title)+'</h3><p>'+esc(row.content||t('noDetails'))+'</p><div class="meta"><label class="visually-hidden" for="status-'+esc(row.id)+'">'+esc(t('status')+': '+row.title)+'</label><select class="status-select status-'+esc(row.status)+'" id="status-'+esc(row.id)+'" data-entry-status="'+esc(row.id)+'">'+statusOptions+'</select><span class="tag">'+esc(categoryLabel(row.category))+'</span>'+deadline+(row.hours!==''?'<span class="time">'+esc(row.hours)+' '+esc(t('hoursUnit'))+'</span>':'')+'<time class="time" datetime="'+esc(row.date)+'">'+esc(dateText(row.date))+'</time></div></div><div class="entry-actions"><button class="iconbtn" type="button" data-edit="'+esc(row.id)+'" aria-label="'+esc(t('edit')+' '+row.title)+'">'+esc(t('edit'))+'</button><button class="iconbtn delete" type="button" data-delete="'+esc(row.id)+'" aria-label="'+esc(t('delete')+' '+row.title)+'">'+esc(t('delete'))+'</button></div></article>';
    }).join('');
  };
  const formError=(field,error,message)=>{$(field).setAttribute('aria-invalid','true');$(error).textContent=message;};
  const clearErrors=()=>{['entryDate','entryDeadline','entryTitle','entryHours','entryContent','repeatEndDate'].forEach(id=>$(id).removeAttribute('aria-invalid'));document.querySelectorAll('[data-repeat-weekday]').forEach(input=>input.removeAttribute('aria-invalid'));['dateError','deadlineError','titleError','hoursError','repeatError'].forEach(id=>$(id).textContent='');$('contentHint').textContent=t('detailsLimit');$('contentHint').classList.remove('field-error');};
  const validateForm=()=>{
    clearErrors();const title=$('entryTitle').value.trim(),content=$('entryContent').value.trim(),hours=normalizeHours($('entryHours').value);let first=null;
    if(!validDate($('entryDate').value)){formError('entryDate','dateError',t('dateInvalid'));first=first||$('entryDate');}
    if($('entryDeadline').value&&!validDate($('entryDeadline').value)){formError('entryDeadline','deadlineError',t('deadlineInvalid'));first=first||$('entryDeadline');}
    if(!title){formError('entryTitle','titleError',t('titleRequired'));first=first||$('entryTitle');}
    else if(title.length>80){formError('entryTitle','titleError',t('titleTooLong'));first=first||$('entryTitle');}
    if(content.length>3000){$('entryContent').setAttribute('aria-invalid','true');$('contentHint').textContent=t('detailsTooLong');$('contentHint').classList.add('field-error');first=first||$('entryContent');}
    if(hours===null){formError('entryHours','hoursError',t('hoursInvalid'));first=first||$('entryHours');}
    let dates=[$('entryDate').value];
    if(state.formMode==='new'&&$('repeatEnabled').checked){
      const end=$('repeatEndDate').value,frequency=$('repeatFrequency').value,weekdays=[...document.querySelectorAll('[data-repeat-weekday]:checked')].map(input=>Number(input.value));
      if(!validDate(end)){formError('repeatEndDate','repeatError',t('repeatEndRequired'));first=first||$('repeatEndDate');}
      else if(end<$('entryDate').value){formError('repeatEndDate','repeatError',t('repeatEndBeforeStart'));first=first||$('repeatEndDate');}
      else if(frequency==='custom'&&!weekdays.length){const checkbox=document.querySelector('[data-repeat-weekday]');checkbox.setAttribute('aria-invalid','true');$('repeatError').textContent=t('repeatNoWeekday');first=first||checkbox;}
      else {dates=recurrenceDates($('entryDate').value,end,frequency,weekdays);if(dates===null){$('repeatEndDate').setAttribute('aria-invalid','true');$('repeatError').textContent=t('repeatTooMany');first=first||$('repeatEndDate');}else if(!dates.length){$('repeatError').textContent=t('repeatNoMatches');first=first||document.querySelector('[data-repeat-weekday]:checked')||$('repeatEndDate');}}
    }
    if(first){first.focus();return null;}return {title,content,hours,date:$('entryDate').value,dates};
  };
  const snapshot=()=>({date:$('entryDate').value,deadline:$('entryDeadline').value,title:$('entryTitle').value,content:$('entryContent').value,category:$('entryCategory').value,hours:$('entryHours').value,status:$('entryStatus').value,repeat:$('repeatEnabled').checked,frequency:$('repeatFrequency').value,end:$('repeatEndDate').value,weekdays:[...document.querySelectorAll('[data-repeat-weekday]:checked')].map(input=>input.value)});
  const updateRepeatPreview=()=>{
    $('repeatOptions').hidden=!$('repeatEnabled').checked||state.formMode!=='new';
    $('repeatEnabled').setAttribute('aria-expanded',String(!$('repeatOptions').hidden));$('repeatToggle').classList.toggle('is-active',$('repeatEnabled').checked&&state.formMode==='new');
    const frequency=$('repeatFrequency').value;
    $('repeatWeekdays').hidden=$('repeatOptions').hidden||frequency!=='custom';
    if($('repeatOptions').hidden){$('repeatPreview').textContent='';return;}
    const weekdays=[...document.querySelectorAll('[data-repeat-weekday]:checked')].map(input=>Number(input.value));
    if(frequency==='custom'&&!weekdays.length){$('repeatPreview').textContent=t('repeatChooseWeekdays');return;}
    const dates=recurrenceDates($('entryDate').value,$('repeatEndDate').value,frequency,weekdays);
    const validRange=validDate($('entryDate').value)&&validDate($('repeatEndDate').value)&&$('repeatEndDate').value>=$('entryDate').value;
    $('repeatPreview').textContent=dates&&dates.length?t('repeatPreview').replace('{count}',dates.length):dates!==null&&validRange?t('repeatNoMatches'):validRange?t('repeatTooMany'):'';
  };
  const openForm=row=>{
    state.formMode=row?'edit':'new';
    state.focus=document.activeElement;$('journalForm').reset();$('editId').value=row?row.id:'';
    $('repeatOptions').hidden=true;$('repeatPreview').textContent='';$('entryDate').value=row?row.date:localDate(today);$('entryDeadline').value=row?row.deadline||'':'';$('entryTitle').value=row?row.title:'';$('entryContent').value=row?row.content:'';
    if(validDate($('entryDate').value)){const p=$('entryDate').value.split('-').map(Number);state.calendarDate=new Date(p[0],p[1]-1,1);}
    $('entryHours').value=row?row.hours:'';$('entryStatus').value=row?row.status:'create';renderCategories(row?row.category:state.categories[0]);$('entryCategory').value=row&&state.categories.includes(row.category)?row.category:(state.categories[0]||'');
    $('formHeading').textContent=t(state.formMode==='edit'?'editEntry':'newWorkEntry');$('repeatToggle').hidden=state.formMode!=='new';$('repeatEnabled').disabled=state.formMode!=='new';$('saveBtn').textContent=t(state.formMode==='edit'?'saveChanges':'saveEntry');clearErrors();updateRepeatPreview();state.snapshot=snapshot();
    $('formPanel').classList.add('open');$('overlay').hidden=!window.matchMedia('(max-width: 800px)').matches;requestAnimationFrame(()=>$('entryTitle').focus());
  };
  const closeForm=(force,restore)=>{
    if(!force&&state.snapshot&&JSON.stringify(snapshot())!==JSON.stringify(state.snapshot)&&!confirm(state.language==='ko'?'작성 중인 내용이 있어요. 저장하지 않고 닫을까요?':'You have unsaved changes. Close without saving?'))return;
    $('formPanel').classList.remove('open');$('overlay').hidden=true;$('journalForm').reset();$('editId').value='';state.snapshot=null;clearErrors();
    state.formMode='new';$('repeatToggle').hidden=false;$('repeatEnabled').disabled=false;$('repeatOptions').hidden=true;$('repeatPreview').textContent='';$('formHeading').textContent=t('newWorkEntry');$('saveBtn').textContent=t('saveEntry');if(restore!==false&&state.focus&&state.focus.isConnected)state.focus.focus();checkPendingDayPrompt();
  };
  const saveForm=event=>{
    event.preventDefault();if(state.saving)return;const value=validateForm();if(!value)return;if(state.storageProblem){toast(t('storageUnreadable'));return;}
    const id=$('editId').value,old=state.entries.find(row=>row.id===id),status=$('entryStatus').value;
    const baseDeadline=$('entryDeadline').value,category=$('entryCategory').value||state.categories[0]||'기타';
    const existingIds=new Set(state.entries.map(row=>row.id)),createdAt=Date.now();
    const makeId=()=>{let newId;do{newId=globalThis.crypto&&typeof globalThis.crypto.randomUUID==='function'?globalThis.crypto.randomUUID():'entry-'+Date.now()+'-'+Math.random().toString(36).slice(2);}while(existingIds.has(newId));existingIds.add(newId);return newId;};
    const recurrenceId=!id&&$('repeatEnabled').checked?makeId():'';
    const additions=value.dates.map(date=>({id:id&&date===value.date?id:makeId(),date,title:value.title,content:value.content,category,hours:value.hours,status,deadline:baseDeadline&&date!==value.date?addDays(baseDeadline,daysBetween(value.date,date)):baseDeadline,isRecurring:id?Boolean(old&&old.isRecurring):Boolean(recurrenceId),recurrenceId:id?(old&&old.recurrenceId||''):recurrenceId,created:old&&id&&date===value.date?old.created:createdAt}));
    state.saving=true;$('saveBtn').disabled=true;
    try{persist({entries:old?state.entries.map(row=>row.id===id?additions[0]:row):[...state.entries,...additions],categories:[...state.categories],translations:{...state.translations}});render();closeForm(true);toast(old?t('entryUpdated'):value.dates.length>1?t('repeatSaved').replace('{count}',value.dates.length):t('entrySaved'));}
    catch{toast(t('saveFailed'));}finally{state.saving=false;$('saveBtn').disabled=false;}
  };
  const closeCategory=restore=>{$('categoryModal').hidden=true;$('categoryModal').setAttribute('aria-hidden','true');if(restore!==false&&state.focus&&state.focus.isConnected)state.focus.focus();};
  const openCategory=()=>{state.focus=document.activeElement;renderCategoryList();$('categoryModal').hidden=false;$('categoryModal').setAttribute('aria-hidden','false');$('newCategoryName').focus();};
  const addCategory=event=>{
    event.preventDefault();const ko=$('newCategoryName').value.trim(),en=$('newCategoryEnglish').value.trim();
    if(!ko||!en){$('categoryError').textContent=t('categoryBothRequired');(!ko?$('newCategoryName'):$('newCategoryEnglish')).focus();return;}
    if(ko.length>24||en.length>24||state.categories.some(name=>name.toLocaleLowerCase()===ko.toLocaleLowerCase())){$('categoryError').textContent=t('categoryDuplicate');$('newCategoryName').focus();return;}
    try{persist({entries:[...state.entries],categories:[...state.categories,ko],translations:{...state.translations,[ko]:en}});$('categoryForm').reset();$('categoryError').textContent='';renderCategoryList();render();$('newCategoryName').focus();toast(t('categoryAdded'));}catch{toast(t('saveFailed'));}
  };
  const renameCategory=button=>{
    const i=Number(button.dataset.saveCategory),old=state.categories[i],ko=$('category-ko-'+i).value.trim(),en=$('category-en-'+i).value.trim();
    if(!ko||!en){toast(t('categoryBothRequired'));return;}
    if(ko.length>24||en.length>24||state.categories.some((name,n)=>n!==i&&name.toLocaleLowerCase()===ko.toLocaleLowerCase())){toast(t('categoryRenameDuplicate'));return;}
    const cats=[...state.categories];cats[i]=ko;const translations={...state.translations};delete translations[old];translations[ko]=en;
    try{persist({entries:state.entries.map(row=>row.category===old?{...row,category:ko}:row),categories:cats,translations});if($('categoryFilter').value===old)$('categoryFilter').value=ko;renderCategoryList();render();toast(t('categoryRenamed'));}catch{toast(t('saveFailed'));}
  };
  const deleteCategory=button=>{
    const i=Number(button.dataset.deleteCategory),name=state.categories[i];if(state.categories.length<2){toast(t('categoryDeleteLast'));return;}
    const remaining=state.categories.filter((_,n)=>n!==i),fallback=remaining.includes('기타')?'기타':remaining[0];
    if(!confirm(state.language==='ko'?'“'+name+'” 분류를 삭제할까요? 관련 기록은 “'+fallback+'” 분류로 이동합니다.':'Delete “'+name+'”? Its entries will move to “'+categoryLabel(fallback)+'”.'))return;
    const translations={...state.translations};delete translations[name];
    try{persist({entries:state.entries.map(row=>row.category===name?{...row,category:fallback}:row),categories:remaining,translations});if($('categoryFilter').value===name)$('categoryFilter').value='';renderCategoryList();render();toast(t('categoryDeleted'));}catch{toast(t('saveFailed'));}
  };
  const exportBackup=()=>{
    const payload={app:'Worklog',version:1,exportedAt:new Date().toISOString(),categories:state.categories,categoryTranslations:state.translations,entries:state.entries};
    const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),link=document.createElement('a');
    link.href=url;link.download=(state.language==='ko'?'worklog-백업':'worklog-backup')+'_'+localDate(today)+'.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(t('exportSuccess'));
  };
  const validateBackup=parsed=>{
    const list=Array.isArray(parsed)?parsed:parsed&&parsed.entries,entries=normalizeEntries(list);
    if(!entries)return null;
    const categories=Array.isArray(parsed)?[]:(parsed.categories===undefined?[]:normalizeCategories(parsed.categories));
    const translations=Array.isArray(parsed)?{}:(parsed.categoryTranslations===undefined?{}:normalizeTranslations(parsed.categoryTranslations));
    if(!categories||!translations)return null;return {entries,categories,translations};
  };
  const importFile=async file=>{
    if(!file)return;if(file.size>10*1024*1024){toast(t('importTooLarge'));$('fileInput').value='';return;}
    try{
      const incoming=validateBackup(JSON.parse(await file.text()));if(!incoming)throw Error('invalid backup');
      const existing=new Set(state.entries.map(row=>row.id)),replacements=incoming.entries.filter(row=>existing.has(row.id)).length;
      const message=state.language==='ko'?incoming.entries.length+'건을 가져옵니다. 기존 기록과 합칠까요?\n'+replacements+'건은 같은 ID라 가져온 내용으로 교체됩니다.':'Import '+incoming.entries.length+' entries and merge them?\n'+replacements+' matching IDs will be replaced.';
      if(!confirm(message))return;if(state.storageProblem){toast(t('storageUnreadable'));return;}
      const map=new Map(state.entries.map(row=>[row.id,row]));incoming.entries.forEach(row=>map.set(row.id,row));
      const categories=[...state.categories];incoming.categories.forEach(name=>{if(!categories.some(c=>c.toLocaleLowerCase()===name.toLocaleLowerCase()))categories.push(name);});
      incoming.entries.forEach(row=>{if(row.category&&!categories.includes(row.category))categories.push(row.category);});
      if(!categories.length)categories.push(...DEFAULTS);
      const entries=[...map.values()].map(row=>row.category&&categories.includes(row.category)?row:{...row,category:categories.includes('기타')?'기타':categories[0]});
      persist({entries,categories,translations:{...state.translations,...incoming.translations}});renderCategoryList();render();toast(t('importSuccess'));
    }catch{toast(t('importBadFile'));}finally{$('fileInput').value='';}
  };
  const applyLanguage=()=>{
    document.documentElement.lang=state.language;document.title=state.language==='ko'?'Worklog — 업무일지':'Worklog — Work Journal';
    const categoryDrafts=[...document.querySelectorAll('.category-row')].map(row=>[row.querySelector('[data-category-ko]')?.value,row.querySelector('[data-category-en]')?.value]);
    document.querySelectorAll('[data-i18n]').forEach(element=>{const key=element.dataset.i18n;if(dict()[key])element.textContent=t(key);});
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element=>element.placeholder=t(element.dataset.i18nPlaceholder));
    document.querySelectorAll('[data-repeat-day]').forEach(element=>{const day=Number(element.dataset.repeatDay),date=new Date(2023,0,1+day);element.textContent=date.toLocaleDateString(locale(),{weekday:'short'});element.closest('label').querySelector('input').setAttribute('aria-label',date.toLocaleDateString(locale(),{weekday:'long'}));});
    $('languageBtn').textContent=state.language==='ko'?'EN':'한국어';$('languageBtn').setAttribute('aria-label',state.language==='ko'?'Switch to English':'한국어로 전환');
    $('exportBtn').textContent=state.language==='ko'?'↓ 백업':'↓ Export';$('importBtn').textContent=state.language==='ko'?'↑ 복원':'↑ Import';
    const sort=$('sortFilter').value;$('sortFilter').innerHTML='<option value="new">'+esc(t('newest'))+'</option><option value="old">'+esc(t('oldest'))+'</option><option value="title">'+esc(t('titleAZ'))+'</option>';$('sortFilter').value=sort;
    $('todayText').textContent=today.toLocaleDateString(locale(),{year:'numeric',month:'long',day:'numeric',weekday:'long'});$('todayText').dateTime=localDate(today);
    $('monthTrigger').setAttribute('aria-label',t('selectMonth'));$('monthPopup').setAttribute('aria-label',t('selectMonth'));
    $('dateHint').textContent=t('dateHint');$('entryDate').placeholder=state.language==='ko'?'YYYY-MM-DD':'YYYY-MM-DD';
    $('dateTrigger').setAttribute('aria-label',t('selectDate'));$('datePopup').setAttribute('aria-label',t('selectDate'));
    $('previousCalendarMonth').setAttribute('aria-label',t('previousMonth'));$('nextCalendarMonth').setAttribute('aria-label',t('nextMonth'));renderCalendar();
    document.querySelectorAll('[data-i18n-aria]').forEach(element=>element.setAttribute('aria-label',t(element.dataset.i18nAria)));
    $('entryDate').lang=state.language;$('entryDeadline').lang=state.language;
    $('formHeading').textContent=t(state.formMode==='edit'?'editEntry':'newWorkEntry');$('repeatToggle').hidden=state.formMode!=='new';$('repeatEnabled').disabled=state.formMode!=='new';updateRepeatPreview();
    renderAnalyticsFilter();
    $('saveBtn').textContent=t(state.formMode==='edit'?'saveChanges':'saveEntry');
    $('closeForm').textContent=t('close');$('cancelBtn').textContent=t('cancel');$('closeCategoryModal').textContent=t('close');
    $('addCategoryBtn').textContent=t('add');
    updateMonth();renderCategories();renderCategoryList();
    categoryDrafts.forEach((draft,index)=>{const ko=$('category-ko-'+index),en=$('category-en-'+index);if(ko&&draft[0]!==undefined)ko.value=draft[0];if(en&&draft[1]!==undefined)en.value=draft[1];});
    $('exportBtn').disabled=state.storageProblem;
    render();
  };
  const checkPendingDayPrompt=()=>{
    if(!promptForNewDay||$('formPanel').classList.contains('open')||!$('categoryModal').hidden)return;
    promptForNewDay=false;
    if(confirm(t('newDayPrompt')))openForm(null);
  };
  const checkDayChange=()=>{
    const current=new Date(),currentISO=localDate(current);
    if(currentISO===localDate(today))return;
    const previousWeek=mondayOf(today);
    today=current;
    if(state.weekStart===previousWeek)state.weekStart=mondayOf(today);
    try{if(storage)storage.setItem(KEYS.activeDate,currentISO);}catch{}
    $('todayText').textContent=today.toLocaleDateString(locale(),{year:'numeric',month:'long',day:'numeric',weekday:'long'});$('todayText').dateTime=currentISO;
    $('monthFilter').value=currentISO.slice(0,7);state.pickerYear=current.getFullYear();updateMonth();render();
    promptForNewDay=true;checkPendingDayPrompt();
  };
  const trapFocus=(container,event)=>{
    if(event.key!=='Tab')return;const list=[...container.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)')].filter(el=>!el.closest('[hidden]'));
    if(!list.length)return;const first=list[0],last=list[list.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  $('journalForm').addEventListener('submit',saveForm);
  $('newBtn').addEventListener('click',()=>openForm(null));$('cancelBtn').addEventListener('click',()=>closeForm(false));$('closeForm').addEventListener('click',()=>closeForm(false));$('overlay').addEventListener('click',()=>closeForm(false));
  $('entries').addEventListener('click',event=>{
    const edit=event.target.closest('[data-edit]'),del=event.target.closest('[data-delete]');
    if(edit){const row=state.entries.find(item=>item.id===edit.dataset.edit);if(row)openForm(row);}
    if(del){const row=state.entries.find(item=>item.id===del.dataset.delete);if(!row||!confirm(state.language==='ko'?'“'+row.title+'” 기록을 삭제할까요?':'Delete “'+row.title+'”?'))return;
      try{persist({entries:state.entries.filter(item=>item.id!==row.id),categories:[...state.categories],translations:{...state.translations}});render();toast(t('entryDeleted'));}catch{toast(t('saveFailed'));}}
  });
  $('repeatEnabled').addEventListener('change',()=>{updateRepeatPreview();});
  ['entryDate','repeatEndDate','repeatFrequency'].forEach(id=>$(id).addEventListener('change',updateRepeatPreview));
  document.querySelectorAll('[data-repeat-weekday]').forEach(input=>input.addEventListener('change',updateRepeatPreview));
  $('entries').addEventListener('change',event=>{
    const select=event.target.closest('[data-entry-status]');if(!select)return;
    const row=state.entries.find(item=>item.id===select.dataset.entryStatus);if(!row)return;
    try{persist({entries:state.entries.map(item=>item.id===row.id?{...item,status:select.value}:item),categories:[...state.categories],translations:{...state.translations}});render();toast(t('statusUpdated'));}catch{select.value=row.status;toast(t('saveFailed'));}
  });
  $('statusMenu').addEventListener('click',event=>{const button=event.target.closest('[data-status-view]');if(!button)return;state.selectedStatus=button.dataset.statusView;$('monthFilter').value='';updateMonth();render();});
  $('statusSummary').addEventListener('click',event=>{const button=event.target.closest('[data-summary-status]');if(!button)return;state.selectedStatus=button.dataset.summaryStatus;render();$('entriesHeading').scrollIntoView({behavior:'smooth',block:'start'});});
  $('analyticsFilter').addEventListener('click',event=>{
    const button=event.target.closest('[data-analytics-repeats]');if(!button)return;
    state.analyticsIncludeRepeats=button.dataset.analyticsRepeats==='include';
    try{if(storage)storage.setItem(KEYS.analyticsIncludeRepeats,JSON.stringify(state.analyticsIncludeRepeats));}catch{}
    renderAnalyticsFilter();render();
  });
  $('previousWeek').addEventListener('click',()=>{state.weekStart=addDays(state.weekStart,-7);renderWeekly();});
  $('nextWeek').addEventListener('click',()=>{state.weekStart=addDays(state.weekStart,7);renderWeekly();});
  $('currentWeek').addEventListener('click',()=>{state.weekStart=mondayOf(today);renderWeekly();});
  $('csvExportBtn').addEventListener('click',exportCSV);
  $('manageCategoriesBtn').addEventListener('click',openCategory);$('closeCategoryModal').addEventListener('click',()=>closeCategory(true));
  $('categoryModal').addEventListener('click',event=>{if(event.target===$('categoryModal'))closeCategory(true);});
  $('categoryForm').addEventListener('submit',addCategory);
  $('categoryList').addEventListener('click',event=>{const save=event.target.closest('[data-save-category]'),del=event.target.closest('[data-delete-category]');if(save)renameCategory(save);if(del)deleteCategory(del);});
  $('categoryList').addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.target.hasAttribute('data-category-ko')||event.target.hasAttribute('data-category-en'))){event.preventDefault();event.target.closest('[data-category-row]').querySelector('[data-save-category]').click();}});
  $('monthTrigger').addEventListener('click',()=>{const opening=$('monthPopup').hidden;$('monthPopup').hidden=!opening;$('monthTrigger').setAttribute('aria-expanded',String(opening));if(opening){renderMonthGrid();$('monthGrid').querySelector('.selected')?.focus();}});
  $('previousYear').addEventListener('click',()=>{if(state.pickerYear>1)state.pickerYear--;renderMonthGrid();});
  $('nextYear').addEventListener('click',()=>{if(state.pickerYear<9998)state.pickerYear++;renderMonthGrid();});
  $('dateTrigger').addEventListener('click',()=>{
    const opening=$('datePopup').hidden;
    if(opening&&validDate($('entryDate').value)){const p=$('entryDate').value.split('-').map(Number);state.calendarDate=new Date(p[0],p[1]-1,1);}
    $('datePopup').hidden=!opening;$('dateTrigger').setAttribute('aria-expanded',String(opening));
    if(opening){renderCalendar();$('calendarGrid').querySelector('.selected')?.focus();}
  });
  $('previousCalendarMonth').addEventListener('click',()=>{state.calendarDate=new Date(state.calendarDate.getFullYear(),state.calendarDate.getMonth()-1,1);renderCalendar();});
  $('nextCalendarMonth').addEventListener('click',()=>{state.calendarDate=new Date(state.calendarDate.getFullYear(),state.calendarDate.getMonth()+1,1);renderCalendar();});
  $('calendarGrid').addEventListener('click',event=>{
    const button=event.target.closest('[data-calendar-date]');if(!button)return;
    $('entryDate').value=button.dataset.calendarDate;clearErrors();closeCalendar(false);$('dateTrigger').setAttribute('aria-expanded','false');$('entryDate').focus();
  });
  $('entryDate').addEventListener('input',()=>{if(validDate($('entryDate').value)){const p=$('entryDate').value.split('-').map(Number);state.calendarDate=new Date(p[0],p[1]-1,1);renderCalendar();}});
  $('entryDate').addEventListener('blur',()=>{if($('entryDate').value)renderCalendar();});
  $('monthGrid').addEventListener('click',event=>{const button=event.target.closest('[data-month]');if(!button)return;$('monthFilter').value=button.dataset.month;updateMonth();$('monthPopup').hidden=true;$('monthTrigger').setAttribute('aria-expanded','false');$('monthTrigger').focus();render();});
  document.addEventListener('click',event=>{
    if(!event.target.closest('.month-picker')){$('monthPopup').hidden=true;$('monthTrigger').setAttribute('aria-expanded','false');}
    if(!event.target.closest('.date-picker'))closeCalendar(false);
  });
  ['sortFilter','categoryFilter'].forEach(id=>$(id).addEventListener('change',render));$('search').addEventListener('input',render);
  $('languageBtn').addEventListener('click',()=>{state.language=state.language==='ko'?'en':'ko';try{storage.setItem(KEYS.language,state.language);}catch{}applyLanguage();});
  $('exportBtn').addEventListener('click',exportBackup);$('importBtn').addEventListener('click',()=>$('fileInput').click());$('fileInput').addEventListener('change',event=>importFile(event.target.files&&event.target.files[0]));
  document.addEventListener('keydown',event=>{
    if(!$('categoryModal').hidden){if(event.key==='Escape'){event.preventDefault();closeCategory(true);}else trapFocus(document.querySelector('.category-dialog'),event);return;}
    if(!$('datePopup').hidden&&event.key==='Escape'){event.preventDefault();closeCalendar(true);return;}
    if(!$('monthPopup').hidden&&event.key==='Escape'){event.preventDefault();$('monthPopup').hidden=true;$('monthTrigger').setAttribute('aria-expanded','false');$('monthTrigger').focus();return;}
    if(event.key==='Escape'&&$('formPanel').classList.contains('open')){event.preventDefault();closeForm(false);return;}
    if(window.matchMedia('(max-width: 800px)').matches&&$('formPanel').classList.contains('open'))trapFocus($('formPanel'),event);
  });
  applyLanguage();checkPendingDayPrompt();window.setInterval(checkDayChange,30_000);
})();
