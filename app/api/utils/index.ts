import axios from 'axios'
import crypto from 'crypto'

export async function checkUrlValidity(url: string) {
  try {
    const response = await axios.head(url)
    return response.status >= 200 && response.status < 400
  } catch (error) {
    return false
  }
}

function getHashPrefix(url: string) {
  const hash = crypto.createHash('sha256').update(url).digest()
  const hashPrefix = hash.subarray(0, 4)
  return hashPrefix.toString('base64')
}

let options = {
  clientId: 'link-orchard-url-checker',
  clientVersion: '1.0.0'
}

export async function checkUrlSafety(url: string, key: string) {
  const hashPrefix = getHashPrefix(url)
  let body = {
    client: {
      clientId: options.clientId,
      clientVersion: options.clientVersion
    },
    threatInfo: {
      threatTypes: [
        'MALWARE',
        'SOCIAL_ENGINEERING',
        'UNWANTED_SOFTWARE',
        'POTENTIALLY_HARMFUL_APPLICATION',
        'THREAT_TYPE_UNSPECIFIED'
      ],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: [{ url }]
    }
  }
  try {
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${key}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.data.matches) {
      return false
    } else {
      console.log('URL is safe.')
      return true
    }
  } catch (error) {
    console.error('Error checking URL safety:', error)
  }
}

function normalizeUrl(url: string) {
  url = url.replace(/[\x09\x0d\x0a]/g, '')
  url = url.split('#')[0]

  return url
}

function normalizeHostname(hostname: string) {
  // 將 IDN 轉換為 ASCII Punycode
  try {
    hostname = new URL(`http://${hostname}`).hostname
  } catch {
    // 如果無法轉換，則保留原始主機名
  }

  hostname = hostname.replace(/^\.+|\.+$/g, '')

  hostname = hostname.replace(/\.{2,}/g, '.')

  hostname = hostname.toLowerCase()

  return hostname
}

function getHashPrefixes(url: string) {
  const urlObj = new URL(url)

  // 標準化主機名稱和路徑
  const normalizedHostname = normalizeHostname(urlObj.hostname)

  const hash = crypto
    .createHash('sha256')
    .update(normalizedHostname)
    .digest()
    .subarray(0, 4)
    .toString('base64')

  return hash
}

async function checkHashPrefix(hashPrefix: string, key: string) {
  const url = `https://safebrowsing.googleapis.com/v5/hashes:search?key=${key}&hashPrefixes=${hashPrefix}`
  const response = await axios.get(url)

  return response.data
}

export async function checkUrlSafetyV5(url: string, key: string) {
  const hashPrefixes = getHashPrefixes(normalizeUrl(url))
  try {
    const result = await checkHashPrefix(hashPrefixes.substring(0, 6), key)
    console.log(`Result for ${hashPrefixes}:`, result)
  } catch (error) {
    console.error('Error checking URL safety:', error)
  }
}
