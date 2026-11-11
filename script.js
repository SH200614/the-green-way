function track(name,params){if(typeof gtag==='function'){gtag('event',name,params||{});}}
document.addEventListener('DOMContentLoaded',function(){
  var tg=document.querySelector('.toggle'),nv=document.querySelector('nav');
  if(tg){tg.addEventListener('click',function(){var o=nv.classList.toggle('open');tg.setAttribute('aria-expanded',o);});}
  document.querySelectorAll('.filters button').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on');});
      b.classList.add('on');var c=b.dataset.cat;
      document.querySelectorAll('.card[data-cat]').forEach(function(card){card.style.display=(c==='all'||card.dataset.cat===c)?'':'none';});
    });
  });
  document.querySelectorAll('.card[data-cat] .btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var card=btn.closest('.card'),more=card.querySelector('.more');
      var open=more.classList.toggle('open');btn.textContent=open?'Hide details':'View details';
      track('select_item',{item_list_name:'Products',items:[{item_name:card.dataset.name,item_category:card.dataset.cat,price:Number(card.dataset.price)}]});
    });
  });
  document.querySelectorAll('form[data-form]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();var ok=true;
      f.querySelectorAll('[required]').forEach(function(i){
        var er=i.parentElement.querySelector('.err'),bad=!i.value.trim();
        if(!bad&&i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)){bad=true;}
        if(er){er.textContent=bad?(i.type==='email'?'Enter a valid email address.':'This field is required.'):'';}
        if(bad){ok=false;}
      });
      if(!ok){return;}
      track('demo_form_submit',{form_name:f.dataset.form});
      var m=f.querySelector('.msg');if(m){m.classList.add('show');}
      f.reset();
    });
  });
});
