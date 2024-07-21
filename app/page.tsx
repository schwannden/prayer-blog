import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allPrayers } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPrayers = sortPosts(allPrayers)
  const prayers = allCoreContent(sortedPrayers)
  return <Main prayers={prayers} />
}
