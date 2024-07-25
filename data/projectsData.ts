interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: '靈命塑造的禱告：路加福音的五個禱告',
    description: '路加福音中圍繞著耶穌誕生的五個禱告，幫助我們塑造一個全天禱告的節奏。',
    imgSrc: '/static/images/projects/day-of-prayer.png',
    href: '/prayer/luke-prayer/intro',
  },
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
  {
    title: '為丈夫禱告',
    description: `為你的丈夫禱告`,
    imgSrc: '/static/images/projects/husband.png',
    href: '/tags/husband',
  },
]

export default projectsData
