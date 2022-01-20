import React from 'react';
import { Divider } from '@mui/material';
import { SkillsType } from '../../../../../types/offer/skill';
import './Tech.sass';

type TechType = {
    skill: SkillsType[]
};

const Tech = ( { skill } : TechType) => {

    const SkillComponent = (props : { name: string, level: number }) : JSX.Element => {
        let skillLevelName  = '';
        switch (props.level){
            case 1:
                skillLevelName = 'nice to have';
                break;
            case 2:
                skillLevelName = 'junior';
                break;
            case 3:
                skillLevelName = 'regular';
                break;
            case 4:
                skillLevelName = 'advanced';
                break;
            case 5:
                skillLevelName = 'mastered';
                break;
        }

        return (
            <div className = "stack-details">
                <div className = "skill">
                    <div className = "skill-level">
                        <div className={`${props.level >= 1 ? 'circle active-skill' : ' circle' }  `} />
                        <div className={`${props.level >= 2 ? 'circle active-skill' : ' circle' }  `} />
                        <div className={`${props.level >= 3 ? 'circle active-skill' : ' circle' }  `} />
                        <div className={`${props.level >= 4 ? 'circle active-skill' : ' circle' }  `} />
                        <div className={`${props.level >= 5 ? 'circle active-skill' : ' circle' }  `} />
                    </div>
                </div>
                <div className="skill-name">{ props.name }</div>
                <div className="skill-experience">{skillLevelName}</div>
            </div>
        );
    };


    return (
        <>
            <div className='blue-left-side' >
                <p className='row-name'> Tech stack </p>
                <Divider/>
            </div>
            <div className='white-right-side'>
                <Divider sx={{ marginLeft: '-20px', marginTop: '30px' }}/>
                <div className="tech-content">
                <div className="stack">
                    { skill.map((item ) => {
                        return ( <SkillComponent key={item.name} name={item.name} level={item.level}  /> );
                    })}
                </div>
                </div>
            </div>
        </>
    );
};

export default Tech;