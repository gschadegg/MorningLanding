import { setExpiry, pastExpiry } from './../../utils/index'

describe('Expiry', () => {
  it('Setting Expiry for 1 Day', () => {
    const expiry = setExpiry()
    let expiryDate = new Date(expiry)
    expiryDate = new Date(
      expiryDate.getFullYear(),
      expiryDate.getMonth(),
      expiryDate.getDate()
    )

    let shouldBeDate = new Date()
    shouldBeDate.setDate(shouldBeDate.getDate() + 1)
    shouldBeDate = new Date(
      shouldBeDate.getFullYear(),
      shouldBeDate.getMonth(),
      shouldBeDate.getDate()
    )

    expect(expiryDate).toEqual(shouldBeDate)
  })

  it('Setting Expiry for 6 hours', () => {
    const expiryDate = setExpiry('every6Hrs')

    let shouldBeDate = new Date()
    shouldBeDate.setTime(shouldBeDate.getTime() + 6 * 60 * 60 * 1000)

    expect(expiryDate).toEqual(shouldBeDate.getTime())
  })

  it('Setting Expiry bad call', () => {
    const expiryDate = setExpiry('BadCall')

    expect(expiryDate).toBe(null)
  })

  it('Expiry has Expired', () => {
    let expiryDate = setExpiry()
    expiryDate = new Date(expiryDate)
    expiryDate.setDate(expiryDate.getDate() - 1)
    expiryDate = expiryDate.getTime()

    const pastTheExpiry = pastExpiry(expiryDate)

    expect(pastTheExpiry).toBe(true)
  })

  it('Expiry has not Expired', () => {
    const expiryDate = setExpiry()

    const activeExpiry = pastExpiry(expiryDate)

    expect(activeExpiry).toBe(false)
  })
})
