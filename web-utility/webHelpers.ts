export async function getAllEntities<T>(url: URL): Promise<T[]> {
  let acc: T[] = []
  let responseData: T[] = []
  let page = 0

  do {
    const urlWithPageParams = addParamsToUrl(url,
      {
        size: "100",
        page: page.toString(),
      })
    const response = await fetch(urlWithPageParams)
    if (!response.ok) {
      throw new Error(`Failed to fetch data form ${urlWithPageParams.toString()}: ${response.statusText}`)
    }

    responseData = await response.json() as T[]
    acc = acc.concat(responseData)
    page++
    sleep(100)
  } while (responseData.length > 0)

  return acc
}

export function addParamsToUrl(url: URL, newParams: Record<string, string>): URL {
  const params = new URLSearchParams(url.search)
  Object.entries(newParams).forEach(([key, value]) => {
    params.append(key, value)
  })
  const newUrl = new URL(url.toString()) // don't mutate url object
  newUrl.search = params.toString()
  return newUrl
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
