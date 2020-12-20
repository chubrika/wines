import React, { useState, useEffect } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { isEmpty } from 'lodash';
import * as i18n from 'i18n-js';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Guestheader = (props) => {
    useEffect(() => {
        loadLanguages();
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [language, setlanguage] = useState(String);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const renderLangImage = () => {
        const value = localStorage.getItem('LANG');
        let item = JSON.parse(value);
        if (!isEmpty(item)) {
            if (item.lang.name === 'ka') {
                return <img src={require('../assets/images/geo-flag.svg')} style={{width: 25}}/>
            }
            else if (item.lang.name === 'en') {
                return <img src={require('../assets/images/eng-flag.svg')} style={{width: 25}}/>
            }
            else if (item.lang.name === 'ru') {
                return <img src={require('../assets/images/rus-flag.svg')} style={{width: 25}}/>
            }
        }

    }
    const loadLanguages = () => {
        const value = localStorage.getItem('LANG');
        let item = JSON.parse(value);
        if (!isEmpty(item)) {
            if (item.lang.name === 'ka') {
                setlanguage('ka');
            }
            else if (item.lang.name === 'en') {
                setlanguage('en');
            }
            else if (item.lang.name === 'ru') {
                setlanguage('ru');
            }
        }
    }

    const onChangelanguage = (lang) => {
        setDropdownOpen(prevState => !prevState);
        props.onChangeLanguage(lang)
    }
    
    return (
        <>
        <div className="right_side_header">
            <div className="dc-logo">
                <img src={require('../assets/images/logo.png')} alt=""/>
            </div>
            <div className="dc-menu">
                <ul>
                    <li><Link to="/">{i18n.t('home')}</Link></li>
                    <li><Link to="/wines-list">{i18n.t('wines_list')}</Link></li>
                    <li><Link to="/price">{i18n.t('price_menu')}</Link></li>
                    <li><Link to="/shops">{i18n.t('shops')}</Link></li>
                    <li><Link to="/calculator">{i18n.t('calculator')}</Link></li>
                    <li><Link to="/contact">{i18n.t('contact_menu')}</Link></li>
                    <li className="link" onClick={() => false}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>{renderLangImage()}</DropdownToggle>
                        <DropdownMenu>
                            {language !== 'ka' && <img onClick={() => onChangelanguage('ka')} src={require('../assets/images/geo-flag.svg')} style={{width: 25}}/>}
                            {language !== 'en' && <img onClick={() => onChangelanguage('en')} src={require('../assets/images/eng-flag.svg')} style={{width: 25}}/>}
                            {language !== 'ru' && <img onClick={() => onChangelanguage('ru')} src={require('../assets/images/rus-flag.svg')} style={{width: 25}}/>}
                        </DropdownMenu>
                    </Dropdown>
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
  }
  
  export default Guestheader;
