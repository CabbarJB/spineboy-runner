export interface Hitbox {
    width: number;
    height: number;
    x: number;
    y: number;
}
export function isColliding(a: Hitbox, b: Hitbox): boolean {

    const tolerance = 3;

    const aRight = a.x + a.width - tolerance;
    const aLeft = a.x + tolerance;
    const aTop = a.y + tolerance;
    const aBottom = a.y + a.height - tolerance;

    const bRight = b.x + b.width - tolerance;
    const bLeft = b.x + tolerance;
    const bTop = b.y + tolerance;
    const bBottom = b.y + b.height - tolerance;


    const notColliding = aRight < bLeft || aLeft > bRight || aBottom < bTop || aTop > bBottom;

    return !notColliding
}