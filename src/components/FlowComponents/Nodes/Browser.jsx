import React, { useState } from 'react'
import Browser, { Chrome } from 'react-browser-ui'
import { v4 as uuidv4 } from "uuid";
const { Tab, Divider, AddButton } = Chrome

export default function ChromeExample({ showHeader = false }) {
  const [tabs, setTabs] = useState([{
    id: uuidv4(),
    activeKey:"new",
    color: "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"),
    title:"new tab"

  }])
  const [backgroundNone, setBackgroundNone] = useState({
    background: false,
    fullScreen:false
  })
  const addTabs = () => {
    const newTab = {
      id: uuidv4(),
      color: "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"),
      title:"new tab"

    }
    setTabs(Prev => [...Prev, newTab])
  }
  const removeTabs = (e, id) => {
    e.stopPropagation()
    setTabs(tabs.filter(item => item.id !== id) )
  }
  const tabEnd = (
    <React.Fragment>
      <Divider />
      <AddButton onClick={ () => addTabs()} />
    </React.Fragment>
  )
  return (
    <div style={{ width: 600, height: 500 }}>
      <Browser
        type={'chrome'}
        showHeader={showHeader}
        activeTabKey={'new'}
        tabEnd={tabEnd}
        onMinifyClick={() => setBackgroundNone((prev) => ({...prev , background:!prev.background}))}
        onFullscreenClick={() => setBackgroundNone((prev) => ({...prev , background:!prev.fullScreen}))}
      >

        {
            tabs.map(item => <Tab key={item.id} imageUrl={''} imageAlt={'green tab image'} title={item.title}
          onClose={(e) => removeTabs(e, item.id)}
          >
            <div
                style={{
                backgroundColor: item.color,
                height:  backgroundNone.fullScreen  ? "800px" : '100%',
                width:  backgroundNone.fullScreen  ? "800px" : '100%',
                opacity: 0.9,
                display:backgroundNone.background ? "none": 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
            <h1 style={{ color: 'white', margin: 0 }}>{'Your component here'}</h1>
          </div>
        </Tab>)
        }

      </Browser>
    </div>
  )
}
