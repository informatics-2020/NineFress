import React from 'react'
import Navbar from 'Parts/navbar'
import Breadcrumb from 'component/Breadcrumb'
import Categories1 from 'Parts/Categories-item/categories1';
import { useParams } from 'react-router-dom';
import AsideMenu from 'Parts/AsideMenu';
import useScrollToTop from 'Helper/Hooks/useScrollToTop';

export default function CategoriesItem1() {
    const {idc} = useParams();
    useScrollToTop()
    return (
        <>
            <Navbar />
            <Breadcrumb list={[
                {url: "/", name: "Home"},
                {url: `/categories/${idc}`, name: "Categories"},
            ]} />
            <Categories1 />
            <AsideMenu />
        </>
    )
}
