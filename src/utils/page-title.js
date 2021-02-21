const title = 'Gourmet Share'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title} - 美食分享社区`
}
