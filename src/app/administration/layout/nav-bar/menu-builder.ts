import { MenuItem, MenuSubItem } from './menu-items';

export class MenuBuilder {
    constructor() { }

    build(): MenuItem[] {

        return [
            this.getMenuItem('Tickets', 'tickets', 'fa-ticket', () => this.getTicketsSubItems()),
            this.getMenuItem('Times', 'times', 'fa-clock', () => this.getTimesSubItems()),
            this.getMenuItem('Years', 'years', 'fa-calendar-days', () => this.getYearsSubItems()),
        ].filter(o => o);
    }

    getTicketsSubItems(): MenuSubItem[] {
        const result: MenuSubItem[] = [];
        result.push(new MenuSubItem('List', '/tickets/list'));
        result.push(new MenuSubItem('New', '/tickets/add'));
        return result;
    }

    getTimesSubItems(): MenuSubItem[] {
        const result: MenuSubItem[] = [];
        result.push(new MenuSubItem('List', '/times/list'));
        result.push(new MenuSubItem('New', '/times/add'));
        return result;
    }

    getYearsSubItems(): MenuSubItem[] {
        const result: MenuSubItem[] = [];
        result.push(new MenuSubItem('List', '/years/list'));
        result.push(new MenuSubItem('New', '/years/add'));
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
