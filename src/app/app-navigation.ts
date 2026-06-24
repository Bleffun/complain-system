
export const navigationEmployee = [
  {
    text: 'หน้าหลัก',
    path: '/',
    icon: 'home'
  },
  {
    text: 'ประวัติการร้องเรียน',
    path: '/History',
    icon: 'history',
  },
]

export const navigationManager = [
  {
    text: 'หน้าหลัก',
    path: '/',
    icon: 'home'
  },
  {
    text: 'ประวัติการร้องเรียน',
    path: '/History',
    icon: 'history',
  },
  {
    text: 'จัดการผนักงาน',
    icon: 'folder',
    items: [
      {
        text: 'สร้างบัญชีพนักงาน',
        path: '/CreateEmployee',
        icon: ''
      },
      {
        text: 'จัดการผนักงาน',
        path: '/ManageEmployee',
        icon: ''
      }
    ]
  }

];
