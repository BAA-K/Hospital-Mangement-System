const bReachSection = (
    element: HTMLElement,
    windowH: number,
    multiple: number
) => {
    const elementOffsetTop = element.offsetTop,
        elementOuterHeight = element.offsetHeight,
        windowScollTop = window.pageYOffset;
    return windowScollTop >=
        elementOffsetTop + elementOuterHeight - windowH * multiple
        ? true
        : false;
};

export const setAnimationScroll = (
    aniElement: HTMLElement[],
    endSection: HTMLElement | null,
    windowHeight: number,
    multiple: number
) => {
    if (!endSection) {
        return;
    }
    if (bReachSection(endSection, windowHeight, multiple)) {
        endSection.style.animation = `${endSection.getAttribute(
            "data-ani"
        )} 1s .3s linear forwards`;
        return;
    }
    aniElement.forEach((e) => {
        if (bReachSection(e, windowHeight, multiple)) {
            e.style.animation = `${e.getAttribute(
                "data-ani"
            )} 1s .3s linear forwards`;
        }
    });
};

export const setAnimation = (
    aniElement: HTMLElement[],
    endSection: HTMLElement | null,
    windowHeight: number
) => {
    if (!endSection) {
        return;
    }
    if (bReachSection(endSection, windowHeight, 1)) {
        for (const e of aniElement) {
            e.style.animation = `${e.getAttribute(
                "data-ani"
            )} 1s .3s linear forwards`;
        }
    }
};
