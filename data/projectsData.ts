interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: '為孩子禱告',
    description: `為你的孩子禱告`,
    imgSrc: '/static/images/projects/children.png',
    href: '/tags/child',
  },
  {
    title: '為妻子禱告',
    description: `為你的妻子禱告`,
    imgSrc: '/static/images/projects/wife.png',
    href: '/tags/wife',
  },
]

export default projectsData
