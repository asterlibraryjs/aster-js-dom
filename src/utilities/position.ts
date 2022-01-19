
export function isVisible(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0
        && rect.left >= 0
        && rect.bottom <= document.documentElement.clientHeight
        && rect.right <= document.documentElement.clientWidth;
}

export function inBounds(el: HTMLElement, x: number, y: number): boolean {
    const rect = el.getBoundingClientRect();
    return x >= rect.left
        && x <= rect.right
        && y >= rect.top
        && y <= rect.bottom;
}
