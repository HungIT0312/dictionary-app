import { Image, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoMain.png";
import Avt from "../../components/header/Avt";
import changeTitle from "../../helpers/changeTitle";
import "./Header.scss";
import SignInBtn from "./SignInBtn";
import { getUserProfile } from "../../stores/user/userThunk";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const [isScroll, setIsScroll] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  changeTitle(pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 630) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  useEffect(() => {
    if (profile) {
      setIsLogin(true);
    }
    return () => {};
  }, [profile]);

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Vocabulary",
      href: "/vocabulary",
    },

    {
      label: "Dictionary",
      href: "/dictionary",
    },
  ];
  const navItems = links.map((item, index) => {
    return (
      <div key={index} className="nav__item ">
        <Link
          className={`nav__item-content ${
            pathname.split("/").filter(Boolean)[0] ===
            item.href.split("/").filter(Boolean)[0]
              ? "active"
              : ""
          } `}
          to={item.href}
        >
          {item.label}
        </Link>
      </div>
    );
  });

  return (
    <Space className={`menu ${isScroll ? "menu__scrolled" : ""}`}>
      <Space className="nav">
        <Image src={logo} preview={false} width={48} loading="lazy"></Image>
        {navItems}
      </Space>
      {isLogin ? <Avt profile={profile} /> : <SignInBtn />}
    </Space>
  );
};

export default Header;
