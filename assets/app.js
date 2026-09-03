(function(){
  const body=document.body;
  const store=window.PDS_STORES[body.dataset.store||"okuwa"];
  const view=body.dataset.view||"general";
  const offline=body.dataset.offline==="true";
  if(!store){document.getElementById("app").textContent="店舗情報を読み込めませんでした。";return;}
  document.title=(view==="guide"?"ケアマネジャーさま向け":"事業所紹介")+"｜"+store.name;
  const tel=store.facts.phone.replace(/-/g,"");
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);
  const assetPath=path=>offline?"../"+path:path;
  const facts=Object.entries({...view==="guide"?{"事業所番号":store.facts.number}:{},"住所":store.facts.address,"電話":store.facts.phone,"サービス提供時間":store.facts.serviceHours,"営業日":store.facts.open,"通常の実施地域":store.facts.area,"定員":store.facts.capacity}).map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  const menuLinks=`<a href="#support">特徴</a><a href="#movie">動画</a><a href="#fit">合う方</a><a href="#day">1日</a><a href="#price">料金</a><a href="#availability">空き状況</a>${view==="guide"?'<a href="#codes">サービスコード</a>':'<a href="okuwa-caremanager.html">ケアマネジャー向け</a>'}<a href="#contact">相談</a>`;
  const commonTop=`
    <nav class="nav"><div class="inner"><a class="brand" href="#top"><span>プラトーケアセンター</span><strong>大桑店</strong></a><div class="navlinks">${menuLinks}</div><details class="mobile-menu"><summary>メニュー</summary><div>${menuLinks}</div></details></div></nav>`;
  const media=`<figure class="hero-photo"><img src="${assetPath(store.photos.hero.src)}" alt="${store.photos.hero.alt}" fetchpriority="high"><figcaption>${store.photos.hero.caption}</figcaption></figure>`;
  const heroAction=view==="guide"?`<div class="actions care-entry"><a class="btn btn-secondary" href="okuwa.html">一般向け紹介ページへ</a></div>`:`<div class="actions care-entry"><a class="btn btn-secondary" href="okuwa-caremanager.html">ケアマネジャー向け情報</a></div>`;
  const hero=`<header class="hero" id="top"><div class="inner hero-grid"><div class="hero-copy"><p class="store-name"><span>${view==="guide"?"FOR CARE MANAGERS／":""}金沢市笠舞本町／デイサービス</span><strong>${store.name}</strong></p><p class="hero-problem">家での暮らしを、できるだけ長く続けたい方へ</p>${heroAction}<h1>${store.heroQuestions.map(x=>`<span>「${x}」</span>`).join("")}<strong>${store.heroPromise}</strong></h1><p class="lead">${store.lead}</p></div>${media}</div></header><div class="fact-band"><div class="inner fact-band-grid"><div><strong>${store.facts.serviceHours}</strong><span>サービス提供</span></div><div><strong>月〜土</strong><span>営業日</span></div><div><strong>30名</strong><span>通所介護定員</span></div><div><strong>送迎あり</strong><span>ご自宅まで</span></div></div></div>`;
  const guideCallout=view==="guide"?`<div class="guide-callout"><strong>「そろそろ一人では難しい」と感じたら</strong><p>入所か在宅かを急いで決める前に、通所介護で何を支えられるか一緒に整理します。</p></div>`:"";
  const support=`<section id="support"><div class="inner"><div class="section-head section-head-wide"><span class="eyebrow">OUR SUPPORT</span><h2>ご本人には、自分らしく過ごせる一日を。<br>ご家族には、ほっとできる時間を。</h2><p>介助が必要になっても、ご本人の気持ちやできることを置き去りにしない。それが大桑店の支援です。</p></div>${guideCallout}<div class="support-grid">${store.strengths.map((x,i)=>`<article class="support-card"><span>0${i+1}</span><div><h3>${x.title}</h3><p>${x.body}</p></div></article>`).join("")}</div></div></section>`;
  const movie=`<section class="movie-section" id="movie"><div class="inner"><div class="section-head section-head-wide"><span class="eyebrow">MOVIE</span><h2>動画で見る、大桑店の雰囲気</h2></div><div class="movie-layout"><div class="movie-frame"><video controls preload="metadata" playsinline poster="${assetPath("assets/okuwa/okuwa-intro-poster.jpg")}" aria-label="プラトーケアセンター大桑店の紹介動画"><source src="${assetPath("assets/okuwa/okuwa-intro.mp4")}" type="video/mp4">お使いの環境では動画を再生できません。</video></div><div class="movie-info"><strong>動画でわかること</strong><ul><li>入浴・運動・交流・食事・学習の時間</li><li>ご本人のペースを大切にする関わり</li><li>一日の終わりのお見送り</li></ul><p>建物外観と浴室は大桑店の実写です。運動・交流・食事・学習・お見送り・締めの場面はイメージ写真です。</p></div></div></div></section>`;
  const services=`<section class="soft"><div class="inner"><div class="section-head"><span class="eyebrow">WHAT WE DO</span><h2>「ここなら行ってもいい」と思える一日へ</h2><p>お風呂や食事だけでなく、過ごし方もご本人に合わせます。無理に同じことをする必要はありません。</p></div><div class="feature-grid">${store.highlights.map((x,i)=>`<article class="feature-card"><img src="${assetPath(x.image)}" alt="${x.alt}" loading="lazy" decoding="async"><div><span>0${i+1}</span><h3>${x.title}</h3><p>${x.body}</p></div></article>`).join("")}</div><div class="service-tags">${store.services.map(x=>`<span>${x}</span>`).join("")}</div></div></section>`;
  const fit=`<section id="fit"><div class="inner"><div class="section-head"><span class="eyebrow">GOOD FIT</span><h2>こんな方に合いやすいです</h2></div><div class="fit-layout"><div class="fit-list">${store.fits.map(x=>`<div>${x}</div>`).join("")}</div><figure class="fit-photo"><img src="${assetPath(store.photos.gallery[2].src)}" alt="${store.photos.gallery[2].alt}" loading="lazy" decoding="async"><figcaption>歩行支援のイメージ</figcaption></figure></div><details class="consult-box"><summary>ご利用前に相談したいケース</summary><div class="consult-content"><p>${store.mismatchNote}</p><ul>${store.mismatches.map(x=>`<li>${x}</li>`).join("")}</ul></div></details></div></section>`;
  const day=`<section class="soft" id="day"><div class="inner"><div class="section-head"><span class="eyebrow">A DAY</span><h2>1日の流れ</h2><p>体調や気分を見ながら、急かさずに過ごします。入浴・機能訓練・生活介助もご本人の状態に合わせます。</p></div><ol class="timeline">${store.day.map((x,i)=>`<li class="time-row"><span class="timeline-marker" aria-hidden="true">${String(i+1).padStart(2,"0")}</span><div class="timeline-content"><b>${x.time}</b><span>${x.text}</span></div></li>`).join("")}</ol></div></section>`;
  const preventiveOptions=store.simulator.preventive.map(x=>`<option value="${x.value}">${x.label}</option>`).join("");
  const fee=`<section id="price"><div class="inner"><div class="section-head"><span class="eyebrow">PRICE</span><h2>料金シミュレーター</h2><p>介護度や利用回数を選ぶと、月の利用料の目安を確認できます。</p></div><div class="sim-wrap" aria-label="利用料金シミュレーター"><div class="sim-form"><h3>利用条件を選ぶ</h3><div class="form-grid"><label>利用区分<select id="serviceType"><option value="daycare">通所介護（要介護1〜5）</option>${preventiveOptions}</select></label><label id="careLevelField">介護度<select id="careLevel"><option value="0">要介護1</option><option value="1">要介護2</option><option value="2">要介護3</option><option value="3">要介護4</option><option value="4">要介護5</option></select></label><label>負担割合<select id="burden"><option value="1">1割</option><option value="2">2割</option><option value="3">3割</option></select></label><label id="weeklyField">通所介護の利用回数<select id="weekly"><option value="1">週1回</option><option value="2">週2回</option><option value="3" selected>週3回</option><option value="4">週4回</option><option value="5">週5回</option><option value="6">週6回</option></select></label><label>送迎<select id="transport"><option value="0" selected>往復送迎あり</option><option value="1">片道送迎なし（減算目安）</option><option value="2">往復送迎なし（減算目安）</option></select></label><label class="check"><input id="lunch" type="checkbox" checked> 昼食あり（630円／食）</label><label class="check" id="bathField"><input id="bath" type="checkbox" checked> 入浴あり</label></div></div><div class="sim-result" aria-live="polite"><h3>月の目安</h3><div class="total" id="totalPrice">計算中</div><ul class="breakdown" id="breakdown"></ul><p class="note note-danger">あくまでも目安です。正式な料金は契約時・ケアプラン作成時に必ずご確認ください。</p><p class="note">通所介護は7時間以上8時間未満の1回あたり料金に月の利用回数目安を掛け、月単位の加算目安を加えています。介護予防型は月額料金を使っています。</p></div></div><details class="fee-details"><summary>1割負担の料金表を見る</summary><div class="fee-list">${store.fees.map(x=>`<div class="fee-row"><span>${x.label}</span><strong>${x.value}</strong></div>`).join("")}</div><p class="note">${store.feeNote}</p></details></div></section>`;
  const availabilityRows=store.availability.rows.map(x=>`<tr><th scope="row">${escapeHtml(x.day)}</th><td><span class="availability-level">${escapeHtml(x.facility)}</span></td><td><span class="availability-level">${escapeHtml(x.bath)}</span></td></tr>`).join("");
  const availability=`<section id="availability"><div class="inner availability-layout"><div><div class="section-head"><span class="eyebrow">AVAILABILITY</span><h2>施設・お風呂の空き状況</h2><p>${store.availability.status}</p></div><p class="note" id="availabilityNote">確認済みの控えを表示しています。最新情報の読み込み後に自動で更新します。</p></div><div class="availability-wrap"><table class="availability-table"><thead><tr><th>曜日</th><th>施設の空き</th><th>お風呂の空き</th></tr></thead><tbody id="availabilityBody">${availabilityRows}</tbody></table></div></div></section>`;
  const codes=view==="guide"?`<section class="soft" id="codes"><div class="inner"><div class="section-head"><span class="eyebrow">SERVICE CODES</span><h2>主なサービスコード</h2><p>紹介・請求時の照合用です。実際の算定は個別のケアプランと算定状況によります。</p></div><div class="code-table-wrap"><table class="code-table"><thead><tr><th>区分</th><th>内容</th><th>サービスコード</th></tr></thead><tbody><tr><td>通所介護</td><td>7時間以上8時間未満／要介護1〜5</td><td>15 2441〜2445</td></tr><tr><td>介護予防型</td><td>週1回程度</td><td>A6 1111</td></tr><tr><td>介護予防型</td><td>週2回程度</td><td>A6 1121</td></tr><tr><td>加算</td><td>入浴介助加算Ⅰ</td><td>15 5301</td></tr><tr><td>加算</td><td>個別機能訓練加算Ⅰイ</td><td>15 5051</td></tr><tr><td>減算</td><td>送迎減算</td><td>15 5612</td></tr></tbody></table></div><p class="note">根拠：厚生労働省の介護サービスコード表、金沢市総合事業サービスコード表（令和8年6月1日以降）。</p></div></section>`:"";
  const contact=`<section class="contact" id="contact"><div class="inner contact-grid"><div><span class="eyebrow">CONTACT</span><h2>ご本人の希望も、<br>ご家族の困りごともお聞かせください</h2><p>どんな一日なら安心して通えそうか、在宅生活を続けるために何が必要かを一緒に整理します。</p><div class="phone"><a href="tel:${tel}">${store.facts.phone}</a></div><p>「ホームページを見た」とお伝えください。</p></div><div class="contact-box"><h3>${store.name}</h3><dl class="facts">${facts}</dl></div></div></section>`;
  document.getElementById("app").innerHTML=commonTop+hero+support+movie+services+fit+day+availability+fee+codes+contact+`<footer class="footer"><div class="inner"><p>${store.name} / 料金と受け入れ状況は目安です。正式な内容はお問い合わせください。</p></div></footer><div class="mobile-actions"><a class="btn btn-primary" href="tel:${tel}" aria-label="${store.facts.phone}へ電話する"><span>電話で相談する</span><strong>${store.facts.phone}</strong></a></div>`;

  const service=document.getElementById("serviceType");
  const careLevel=document.getElementById("careLevel");
  const careLevelField=document.getElementById("careLevelField");
  const burden=document.getElementById("burden");
  const weekly=document.getElementById("weekly");
  const weeklyField=document.getElementById("weeklyField");
  const transport=document.getElementById("transport");
  const lunch=document.getElementById("lunch");
  const bath=document.getElementById("bath");
  const bathField=document.getElementById("bathField");
  const total=document.getElementById("totalPrice");
  const breakdown=document.getElementById("breakdown");
  const yen=n=>Math.round(n).toLocaleString("ja-JP")+"円";
  function calculateFee(){
    const rate=Number(burden.value);
    const isDaycare=service.value==="daycare";
    careLevelField.classList.toggle("is-hidden",!isDaycare);
    weeklyField.classList.toggle("is-hidden",!isDaycare);
    bathField.classList.toggle("is-hidden",!isDaycare);
    const preventive=store.simulator.preventive.find(x=>x.value===service.value);
    const visits=isDaycare?Math.round(Number(weekly.value)*4.3):preventive.visits;
    const perVisit=isDaycare?store.simulator.daycareFees[rate][Number(careLevel.value)]:0;
    const baseInsurance=isDaycare?perVisit*visits+store.simulator.monthlyDaycareAddons[rate]:preventive.fees[rate];
    const bathDeduction=isDaycare&&!bath.checked?store.simulator.bathDeduction*rate*visits:0;
    const transportDeduction=Number(transport.value)*store.simulator.transportDeduction*rate*visits;
    const insurance=Math.max(0,baseInsurance-bathDeduction-transportDeduction);
    const lunchFee=lunch.checked?store.simulator.lunch*visits:0;
    total.textContent="約 "+yen(insurance+lunchFee);
    breakdown.innerHTML=[
      ["利用区分",service.options[service.selectedIndex].text],
      ...(isDaycare?[["介護度",careLevel.options[careLevel.selectedIndex].text],["1回あたり",yen(perVisit)]]:[]),
      ["月の利用回数目安",visits+"回"],
      ["介護保険分目安",yen(insurance)],
      ["送迎減算目安",transportDeduction?"-"+yen(transportDeduction):yen(0)],
      ...(isDaycare?[["入浴",bath.checked?"料金に含む":"入浴なしの目安を減算"]]:[]),
      ["昼食代目安",yen(lunchFee)]
    ].map(([key,value])=>`<li><span>${key}</span><b>${value}</b></li>`).join("");
  }
  [service,careLevel,burden,weekly,transport,lunch,bath].forEach(el=>el.addEventListener("change",calculateFee));
  calculateFee();

  if(!offline&&store.availability.sheetId){
    window.__okuwaAvailability=function(response){
      try{
        const rows=response.table.rows.map(row=>({day:row.c[0]?.v||"",facility:row.c[1]?.v||"",bath:row.c[2]?.v||""})).filter(x=>x.day&&x.day!=="曜日");
        if(!rows.length)return;
        document.getElementById("availabilityBody").innerHTML=rows.map(x=>`<tr><th scope="row">${escapeHtml(x.day)}</th><td><span class="availability-level">${escapeHtml(x.facility)}</span></td><td><span class="availability-level">${escapeHtml(x.bath)}</span></td></tr>`).join("");
        document.getElementById("availabilityNote").textContent="大桑店の空き状況表から最新情報を表示しています。更新時刻は元の表をご確認ください。";
      }catch(error){}
    };
    const script=document.createElement("script");
    script.src=`https://docs.google.com/spreadsheets/d/${store.availability.sheetId}/gviz/tq?gid=${store.availability.gid}&tqx=out:json;responseHandler:__okuwaAvailability`;
    document.body.appendChild(script);
  }
})();
