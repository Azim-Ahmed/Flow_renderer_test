import React from 'react'
import Browser, { Chrome } from 'react-browser-ui'

const { Tab, Divider, AddButton } = Chrome

export default function ChromeExample ({ showHeader = false }) {
  const tabEnd = (
    <React.Fragment>
      <Divider />
      <AddButton />
    </React.Fragment>
  )
  return (
    <div style={{ width: 600, height: 500 }}>
      <Browser
        type={'chrome'}
        showHeader={showHeader}
        activeTabKey={'green'}
        tabEnd={tabEnd}>
        <Tab key={'green'} imageUrl={''} imageAlt={'green tab image'} title={'Green'}>
          <div style={{ backgroundColor: 'green', height: '100%', width: '100%', opacity: 0.9, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'white', margin: 0 }}>{'Your component here'}</h1>
          </div>
        </Tab>
        <Tab key={'blue'} imageAlt={'blue tab image'} title={'Blue'}>
          <div style={{ backgroundColor: 'green', height: '100%', width: '100%', opacity: 0.9, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'white', margin: 0 }}>{'Your component here'}</h1>
          </div>
        </Tab>
      </Browser>
    </div>
  )
}

// import React from 'react'
// import Browser, { Firefox } from 'react-browser-ui'

// const { Tab, Divider, AddButton } = Firefox

// export default function FirefoxExample () {
//   const tabEnd = (
//     <React.Fragment>
//       <Divider />
//       <AddButton />
//     </React.Fragment>
//   )
//   return (
//     <div style={{ width: 600, height: 500 }}>
//       <Browser
//         type={'firefox'}
//         showHeader={false}
//         activeTabKey={'green'}
//         tabEnd={tabEnd}>
//         <Tab key={'green'} imageAlt={'green tab image'} title={'Green'}>
//           <div style={{ backgroundColor: 'green', height: '100%', width: '100%', opacity: 0.9, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <h1 style={{ color: 'white', margin: 0 }}>{'Your component here'}</h1>
//           </div>
//         </Tab>
//         <Tab key={'blue'} imageUrl={''} imageAlt={'blue tab image'} title={'Blue'}>
//           <div style={{ backgroundColor: 'green', height: '100%', width: '100%', opacity: 0.9, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <h1 style={{ color: 'white', margin: 0 }}>{'Your component here'}</h1>
//           </div>
//         </Tab>
//       </Browser>
//     </div>
//   )
// }