import React from 'react';
import { useTranslation } from 'react-i18next'

const NameCard: React.FC = () => {

    const { t } = useTranslation();
    
    return (
       <div id="nameCard">
           <span>{t('namecard.greeting')}</span>
           <h1>{t('namecard.name')}</h1>
           <span className="subheader">{t('namecard.introduction')}</span>
       </div>
    );
}

export default NameCard;