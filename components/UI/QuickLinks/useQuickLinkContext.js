import React from 'react'

const QuickLinkContext = React.createContext(null)

function QuickLinkProvider({ children, value }) {
  return (
    <QuickLinkContext.Provider value={value}>
      {children}
    </QuickLinkContext.Provider>
  )
}

function useQuickLinkContext() {
  const context = React.useContext(QuickLinkContext)

  if (context === undefined) {
    throw new Error('QuickLinkContext must be used within a QuickLinkProvider')
  }
  return context
}

export { QuickLinkProvider, useQuickLinkContext }
