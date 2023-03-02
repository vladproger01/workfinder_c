// import
import React, { Component }  from 'react';

import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import AddCompanyInfo from "views/Auth/AddCompanyInfo.js";
import AddStudentInfo from "views/Auth/AddStudentInfo.js";

import FactoryPositions from "views/Student/FactoryPositions.js"; 
import FactoryPositionDetail from "views/Student/FactoryPositionDetail.js"; 
import CompanyPositionsForStudent from "views/Student/CompanyPositionsForStudent";
import CompanyPositionDetailForStudent from "views/Student/CompanyPositionDetail.js"; 

import CompanyPositionDetailForCompany from "views/Company/CompanyPositionDetail.js"; 
import CompanyPositionsForCompany from "views/Company/CompanyPositionsForCompany";
import CreateCompanyPosition from "views/Company/CreateCompanyPosition.js";


import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Profile from "views/Dashboard/Profile.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";
import { factory } from 'typescript';

var dashRoutes = [
  {
    path: "/signin",
    name: "Войти",
    icon: <DocumentIcon color='inherit' />,
    component: SignIn,
    layout: "/auth",
    sidebarShow: true,
  },
  {
    path: "/signup",
    name: "Зарегистрироваться",
    icon: <RocketIcon color='inherit' />,
    component: SignUp,
    layout: "/auth",
    sidebarShow: true,
  },
  {
    path: "/add-company-info",
    name: "Данные компании",
    icon: <DocumentIcon color='inherit' />,
    component: AddCompanyInfo,
    layout: "/company",
    sidebarShow: true,
  },
  {
    path: "/add-student-info",
    name: "Данные студента",
    icon: <DocumentIcon color='inherit' />,
    component: AddStudentInfo,
    layout: "/student",
    sidebarShow: true,
  },
  {
    path: "/factory-positions",
    name: "Работа на предприятии",
    icon: <DocumentIcon color='inherit' />,
    component: FactoryPositions,
    layout: "/student",
    sidebarShow: true,
  },
  {
    path: "/factory-position-detail/:id",
    name: "Работа на предприятии",
    icon: <DocumentIcon color='inherit' />,
    component: FactoryPositionDetail,
    layout: "/student",
    sidebarShow: false,
  },
  {
    path: "/company-positions",
    name: "Работа в компании",
    icon: <DocumentIcon color='inherit' />,
    component: CompanyPositionsForStudent,
    layout: "/student",
    sidebarShow: true,
  },
  {
    path: "/company-position-detail/:id",
    name: "Работа в компании",
    icon: <DocumentIcon color='inherit' />,
    component: CompanyPositionDetailForStudent,
    layout: "/student",
    sidebarShow: false,
  },
  {
    path: "/company-positions",
    name: "Работа в компании",
    icon: <DocumentIcon color='inherit' />,
    component: CompanyPositionsForCompany,
    layout: "/company",
    sidebarShow: true,
  },
  {
    path: "/company-position-detail/:id",
    name: "Вакансии в компании",
    icon: <DocumentIcon color='inherit' />,
    component: CompanyPositionDetailForCompany,
    layout: "/company",
    sidebarShow: false,
  },
  {
    path: "/create-company-position",
    name: "Создать вакансию",
    icon: <DocumentIcon color='inherit' />,
    component: CreateCompanyPosition,
    layout: "/company",
    sidebarShow: true,
  },




  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/auth",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/auth",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/auth",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
