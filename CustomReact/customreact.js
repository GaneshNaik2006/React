let mainelement=document.querySelector(".root");

const reactEl={
    type:'a',
    props:{
        href:'https://github.com/hiteshchoudhary?tab=overview&from=2025-12-01&to=2025-12-3',
        target:'_blank'
    },
    children:'click me to go google site'

}

function customrender(mainelement,reactel){
    let domel=document.createElement(reactEl.type);
    domel.innerHTML=reactEl.children;
    domel.setAttribute('href',reactEl.prop.href);
    domel.setAttribute('href',reactEl.prop.target);

    for (const prop in reactEl.props) {
        if (reactEl.props.prop==='children') continue;
        domel.setAttribute(prop,reactEl.props.prop);
        
    }
    mainelement.append(domel);

}

customrender(mainelement,reactEl);

