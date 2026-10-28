const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#nav-links');

function closeMenu(){
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Abrir menu')
}

menuButton.addEventListener('click',()=>{
    const open=navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')
});

navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
document.addEventListener('click',event=>{if(!event.target.closest('header'))closeMenu()});

const sections=document.querySelectorAll('main section[id]');

const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            navigation.querySelectorAll('a').forEach(link=>{
                if(link.getAttribute('aria-current')==='page')return;
                const samePage=new URL(link.href).pathname===location.pathname;
                const active=samePage&&link.hash==='#'+entry.target.id;
                link.classList.toggle('active',active);
                if(active)link.setAttribute('aria-current','location');
                else link.removeAttribute('aria-current')})
            }
        }
    )},{rootMargin:'-15% 0px -55% 0px',threshold:0}
);

sections.forEach(section=>observer.observe(section));

const projectData=[
    {
        title:'Uma marca. Novas possibilidades.',
        description:'Um conceito de website institucional com apresentação da empresa, serviços e contactos. Uma presença digital clara, adaptada a telemóveis e pensada para facilitar a descoberta da sua marca.'
    },
    {
        title:'Mais próximo dos seus clientes.',
        description:'Um conceito de plataforma que organiza a oferta de serviços e torna a informação mais acessível. Percursos simples ajudam cada visitante a encontrar a solução que procura e a entrar em contacto.'
    },
    {
        title:'Menos complexidade. Mais potencial.',
        description:'Um conceito de digitalização que parte da análise dos processos do negócio para identificar tarefas repetitivas, simplificar fluxos de trabalho e melhorar a organização da informação.'
    }
];

const dialog=document.querySelector('#project-dialog');

document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
    const data=projectData[Number(button.dataset.project)];
    document.querySelector('#dialog-title').textContent=data.title;
    document.querySelector('#dialog-description').textContent=data.description;
    dialog.showModal()
}));

document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-contact')?.addEventListener('click',()=>dialog.close());

dialog?.addEventListener('click',event=>{
    if(event.target===dialog){
        const rect=dialog.getBoundingClientRect();
        if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)
            dialog.close()
        }
    }
);

document.querySelector('#year').textContent=new Date().getFullYear();
