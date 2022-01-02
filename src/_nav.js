export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Maison',
  },
  {
    component: 'CNavItem',
    name: 'Lumières',
    to: '/lights',
    icon: 'cil-Lightbulb',
  },
  {
    component: 'CNavItem',
    name: 'Météo',
    to: '/weather',
    icon: 'cil-cloudy',
  },
  {
    component: 'CNavTitle',
    name: 'Components',
  },
  {
    component: 'CNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'primary',
      shape: 'pill',
    },
  },
]
