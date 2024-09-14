import { MenuItem, MenuSubItem } from './menu-items';

export class MenuBuilder {
    constructor() { }

    build(): MenuItem[] {

        return [
            this.getMenuItem('Tickets', 'tickets', 'fa-ticket', () => this.getTicketsSubItems()),
            this.getMenuItem('Ticket groups', 'ticket_groups', 'fa-clock', () => this.getSubItemsByPath('ticket_groups')),
            this.getMenuItem('Events', 'events', 'fa-calendar-days', () => this.getSubItemsByPath('events')),
        ].filter(o => o);
    }

    getSubItemsByPath(
        path: string = 'events'
    ): MenuSubItem[] {
        const result: MenuSubItem[] = [];
        result.push(new MenuSubItem('List', `/${path}/list`));
        result.push(new MenuSubItem('New', `/${path}/add`));
        return result;
    }

    getTicketsSubItems(): MenuSubItem[] {
        const result: MenuSubItem[] = [];
        result.push(new MenuSubItem('List', '/tickets/list'));
        result.push(new MenuSubItem('New', '/tickets/add'));
        return result;
    }

    private getMenuItem(
        name: string, defaultLink: string, icon: string, getSubItems: () => MenuSubItem[]
    ): MenuItem {
        const menuItem = new MenuItem(name, defaultLink, icon);
        menuItem.subItems.push(...getSubItems());
        return menuItem;
    }
}
