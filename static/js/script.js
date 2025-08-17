// 全局工具函数
document.addEventListener('contextmenu', e => e.preventDefault());
function handlePress() { this.classList.add('pressed'); }
function handleRelease() { this.classList.remove('pressed'); }
function handleCancel() { this.classList.remove('pressed'); }
function toggleClass(selector, className) { document.querySelectorAll(selector).forEach(el => el.classList.toggle(className)); }
function pop(imageURL) {
    const tcImg = document.querySelector(".tc-img");
    if (tcImg && imageURL) tcImg.src = imageURL;
    toggleClass(".tc-main, .tc", "active");
}
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let c of ca) {
        c = c.trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 动态渲染函数
const render = {
    config: (cfg) => {
        document.getElementById('site-title').textContent = cfg.title || '';
        document.getElementById('site-favicon').href = cfg.favicon || '';
        // 更多meta标签可以按需添加
    },
    logo: (cfg) => {
        const container = document.getElementById('logo-container');
        if (container) container.style.backgroundImage = `url(${cfg.logo})`;
        const frame = document.createElement('img');
        frame.style.cssText = "position: absolute;top:-15%;left:-10%;width: 120%; aspect-ratio: 1/1;";
        frame.src = cfg.logoFrame;
        if (container) container.appendChild(frame);
    },
    header: (cfg) => {
        const container = document.getElementById('header-container');
        if (!container) return;
        let descriptionsHTML = cfg.header.descriptions.map(d => `<div class="description">${d}</div>`).join('');
        container.innerHTML = `
            <div class="index-logo" style="background-image: url(${cfg.logo});">
                <img style="position: absolute;top:-15%;left:-10%;width: 120%; aspect-ratio: 1/1;" src="${cfg.logoFrame}">
            </div>
            <div class="welcome">${cfg.header.welcome} <span class="gradientText">${cfg.header.name}</span></div>
            ${descriptionsHTML}
            <div id="icon-container" class="iconContainer"></div>
            <div class="tanChiShe">
                <img id="tanChiShe" src="./static/svg/snake-Light.svg" alt="snake">
            </div>
        `;
    },
    // sidebar: (cfg) => {
    //     const des = document.getElementById('left-des-container');
    //     if (des) des.innerHTML = `<div class="left-des-item">${cfg.sidebar.locationIcon || ''}${cfg.sidebar.location}</div><div class="left-des-item">${cfg.sidebar.statusIcon || ''}${cfg.sidebar.status}</div>`;
    //     const tags = document.getElementById('left-tag-container');
    //     if (tags) tags.innerHTML = cfg.sidebar.tags.map(tag => `<div class="left-tag-item">${tag}</div>`).join('');
    //     const timeline = document.getElementById('line');
    //     if (timeline) timeline.innerHTML = cfg.sidebar.timeline.map(item => `<li><div class="focus"></div><div>${item.event}</div><div>${item.year}</div></li>`).join('');
    // },
    sidebar: (cfg) => {
        const des = document.getElementById('left-des-container');
        if (des) des.innerHTML = `<div class="left-des-item">${cfg.sidebar.locationIcon || ''}${cfg.sidebar.location}</div><div class="left-des-item">${cfg.sidebar.statusIcon || ''}${cfg.sidebar.status}</div>`;
        const tags = document.getElementById('left-tag-container');
        if (tags) tags.innerHTML = cfg.sidebar.tags.map(tag => `<div class="left-tag-item">${tag}</div>`).join('');
        const timeline = document.getElementById('line');
        if (timeline) timeline.innerHTML = cfg.sidebar.timeline.map(item => `<li><div class="focus"></div><div>${item.event}</div><div>${item.year}</div></li>`).join('');
    },
    projects: (id, data) => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = data.map(p => `
            <a class="projectItem ${p.class}" target="_blank" href="${p.href}">
                <div class="projectItemLeft"><h1>${p.title}</h1><p>${p.description}</p></div>
                <div class="projectItemRight"><img src="${p.imgSrc}" alt="${p.title}"></div>
            </a>`).join('');
    },
    socialLinks: (data) => {
        const container = document.getElementById('icon-container');
        if (!container) return;
        let linksHTML = data.map(link => {
            if (link.type === 'link') return `<a class="iconItem" href="${link.href}">${link.icon}<div class="iconTip">${link.tip}</div></a>`;
            if (link.type === 'pop') return `<a class="iconItem" onclick="pop('${link.image}')" href="javascript:void(0)">${link.icon}<div class="iconTip">${link.tip}</div></a>`;
        }).join('');
        linksHTML += `<a class="switch" href="javascript:void(0)"><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked><label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label></div></a>`;
        container.innerHTML = linksHTML;
    },
    skills: (cfg) => {
        const container = document.getElementById('skills-container');
        if (container) container.innerHTML = `<img id="skillPc" src="${cfg.skills.pc}" alt="PC Skills"><img id="skillWap" src="${cfg.skills.wap}" alt="WAP Skills">`;
    },
    footer: (cfg) => {
        const container = document.getElementById('footer-container');
        if (container) container.innerHTML = `${cfg.footer.copyright} | <a href="${cfg.footer.icpLink}">${cfg.footer.icp}</a>`;
    }
};

// 主逻辑
document.addEventListener('DOMContentLoaded', function () {
    if (typeof siteConfig !== 'undefined') {
        render.config(siteConfig);
        render.logo(siteConfig);
        render.header(siteConfig);
        render.sidebar(siteConfig);
        render.socialLinks(siteConfig.socialLinks);
        render.projects('site-projects-container', siteConfig.siteProjects);
        render.projects('project-projects-container', siteConfig.projectProjects);
        render.skills(siteConfig);
        render.footer(siteConfig);
    }

    document.querySelectorAll('.projectItem').forEach(button => {
        ['mousedown', 'touchstart'].forEach(evt => button.addEventListener(evt, handlePress));
        ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => button.addEventListener(evt, handleRelease));
    });

    const tc = document.querySelector('.tc');
    if(tc) tc.addEventListener('click', () => pop());
    const tc_main = document.querySelector('.tc-main');
    if(tc_main) tc_main.addEventListener('click', e => e.stopPropagation());

    const html = document.querySelector('html');
    const tanChiShe = document.getElementById("tanChiShe");
    let themeState = getCookie("themeState") || "Light";
    const checkbox = document.getElementById('myonoffswitch');

    function changeTheme(theme) {
        if(tanChiShe) tanChiShe.src = `./static/svg/snake-${theme}.svg`;
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }

    if(checkbox) {
        checkbox.addEventListener('change', () => changeTheme(themeState === "Dark" ? "Light" : "Dark"));
        checkbox.checked = themeState !== "Dark";
    }
    
    changeTheme(themeState);
});

window.addEventListener('load', function() {
    const pageLoading = document.querySelector("#loading");
    if(pageLoading) {
        setTimeout(() => {
            pageLoading.style.opacity = '0';
            setTimeout(() => pageLoading.style.display = 'none', 200);
        }, 100);
    }
});