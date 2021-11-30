export default {
    user: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    url: '/profile',
                    icon: 'feather icon-home',
                },
                {
                    id: 'home',
                    title: 'Home',
                    type: 'item',
                    url: '/',
                    icon: 'feather icon-home',
                },
            ]
        }
    ],
    admin: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/admin/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'collapse',
                    icon: 'feather icon-user',
                    children: [
                        {
                            id: 'listUsers',
                            title: 'List Users',
                            type: 'item',
                            url: '/admin/users/list'
                        }
                    ]
                },
                {
                    id: 'categories',
                    title: 'Categories',
                    type: 'item',
                    icon: 'feather icon-box',
                    url: '/admin/categories/list'
                }
            ]
        }
    ]
}