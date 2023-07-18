import { Box, Text, ValueGroup } from '@adminjs/design-system'
import React from 'react'
import xss from 'xss'
import { useTranslation } from 'adminjs'


const ShowNewsContents = (props) => {
  const { property, record } = props
  const { translateProperty } = useTranslation()
  const value = record.params[property.path] || '';
  

  const createMarkup = (html) => ({ dangerouslySetInnerHTML: { __html: xss(html) } })

  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <Box py="xl" px={['0', 'xl']} border="default">
        <Text {...createMarkup(value)} />
      </Box>
    </ValueGroup>
  )

}

export default ShowNewsContents;








