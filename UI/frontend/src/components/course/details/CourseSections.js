import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import CourseSectionItem from './CourseSectionItem';

const CourseSections = ({courseModules}) => {
  return (
    <div>
      <h5><b>Kursun İçindekiler</b></h5>
      <Accordion>
        {
          courseModules && courseModules.sort((a, b) => (a.order > b.order) ? 1 : -1).map((module, index) => (
            <CourseSectionItem key={module.id} module={module} />
          ))
        }
    </Accordion>
    </div>
  )
}

export default CourseSections