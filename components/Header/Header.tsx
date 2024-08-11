"use client";
//Global
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { showToastMessage } from "@/app/toastsChange";
import { useRouter } from "next/navigation";
//Components
import {
  Badge,
  Tooltip,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { SearchModal } from "../Modals/SearchModal/SearchModal";
import { HeaderSearch } from "../HeaderSearch/HeaderSearch";
import { LanguageSelect } from "../Modals/LanguageSelect/LanguageSelect";
import { Icons } from "../Icons/Icons";
//Hooks
import { useTranslate } from "@/hooks/useTranslate";
import { useTypedSelector } from "@/hooks/useReduxHooks";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCart } from "@/hooks/useCart";
import { useUserActions } from "@/hooks/useUserActions";
import { useFavorites } from "@/hooks/useFavorites";
//Utils
import {
  ABOUT_ROUTE,
  BASKET_ROUTE,
  CATALOG_ROUTE,
  CONTACTS_ROUTE,
  DELIVERY_ROUTE,
  FAVORITES_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SHOP_PHONE,
  SHOP_ROUTE,
} from "@/utils/Consts";
//Icons
import logo from "@/public/assets/other/logo.svg";
import logo2 from "@/public/assets/other/logo2.svg";
//Styles
import "./Header.scss";

export function Header() {
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { push } = useRouter();
  //Hooks
  const translate = useTranslate();
  const { category } = useTypedSelector(state => state.products);
  const { categories } = useTypedSelector(state => state.categories);
  const { isAuth, status } = useTypedSelector(state => state.user);
  const { cart } = useTypedSelector(state => state.cart);
  const { favorites } = useTypedSelector(state => state.favorites);

  const { onSetCategory } = useProducts();
  const { onGetUser, onLogOutUser } = useUserActions();
  const { onFetchCart } = useCart();
  const { fetchFavorites } = useFavorites();
  const {
      onSetCategories,
      mapCategoriesOnDesktop,
      mapCategoriesOnPhone,
      onSetTypes,
      onSetSubtypes,
    } = useCategories("#E30387");



  //Styles
  const buttonStyles = {
    backgroundColor: "transparent",
    borderRadius: 0,
    width: "100%",
  };
  //ClassNames
  const burderMenuClass = isOpen ? "header-burder active" : "header-burder";
  const cartCounter = cart?.order_products?.length ? "w-[25px] h-[25px] visible": "hidden";
  const favoritesCounter = favorites?.length ? "w-[25px] h-[25px] visible" : "hidden";
  const accountProfileText = !isAuth ? translate.headerLogIn : translate.headerProfile;
  //Routes
  const PROFILE_ROUTER = !isAuth ? LOGIN_ROUTE : PROFILE_ROUTE;
  const FAVORITE_ROUTER = !isAuth ? LOGIN_ROUTE : FAVORITES_ROUTE;
  const CART_ROUTE = !isAuth ? LOGIN_ROUTE : BASKET_ROUTE;



  const handleClickButton = (message: string) => {
    if (!isAuth) showToastMessage("warn", message);
  };

  const renderHeaderDropdown = () => (
    <Dropdown isKeyboardDismissDisabled>
      <DropdownTrigger>
        <div className="flex gap-[10px]">
          <Icons id="profile" />
          <p className="text-black">{accountProfileText}</p>
        </div>
      </DropdownTrigger>
      <DropdownMenu classNames={{ base: "p-0" }}>
        <DropdownItem style={{ textAlign: "center", height: "40px" }}>
          <Link href={PROFILE_ROUTE}>{translate.headerToProfile}</Link>
        </DropdownItem>
        <DropdownItem
          style={{ textAlign: "center", height: "40px" }}
          onClick={onLogOutUser}
        >
          {translate.profilePageLogOut}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const returnHeaderElement = (isMobile: boolean) => {
    //ClassNames
    const headerLinksClassName = `flex ${!isMobile ? "flex-col" : "flex-row gap-[10px]"} items-center justify-between`;
    const renderLinkIdClassName = !isMobile ? "profileAccountWhite" : "profile-account";
    const renderLinkPClassName =  !isMobile ? "text-white" : "text-black";
    
    if (!isAuth) return (
      <Link
        href={PROFILE_ROUTER}
        className={headerLinksClassName}
      >
        <Icons id={renderLinkIdClassName} />
        <p className={renderLinkPClassName}>
          {accountProfileText}
        </p>
      </Link>
    );

    if (!isMobile) return(
      <Tooltip
        classNames={{ content: "p-0 overflow-hidden" }}
        style={{ cursor: "pointer" }}
        content={
          <div className="flex flex-col items-center">
            <Button
              className="h-[40px] flex items-center"
              onClick={() => push(PROFILE_ROUTE)}
              style={buttonStyles}
            >
              {translate.headerToProfile}
            </Button>
            <Button onClick={onLogOutUser} style={buttonStyles}>
              {translate.profilePageLogOut}
            </Button>
          </div>
        }
        className="flex flex-col items-center justify-between"
      >
        <div className="flex flex-col items-center cursor-pointer">
          <Icons id="profileWhiteAccount" />
          <span className="text-white">{accountProfileText}</span>
        </div>
      </Tooltip>
    );

    return renderHeaderDropdown();
  };



  useEffect(() => {
    onGetUser();
  }, [onGetUser]);

  useEffect(() => {
    if (status === "fulfilled" && isAuth) {
      fetchFavorites();
      onFetchCart();
    }
  }, [isAuth, status, fetchFavorites, onFetchCart]);

  useEffect(() => {
    onSetCategories();
    onSetTypes();
    onSetSubtypes();
  }, [onSetCategories, onSetTypes, onSetSubtypes]);
 


  return (
    <header className="header-color">
      <div className="container mx-auto px-[29px] sm:px-0">
        <nav className="hidden lg:flex justify-between py-[25px]">
          <div className="flex items-center gap-2">
            <LanguageSelect color="white" />
          </div>

          <div className="flex gap-[75px]">
            <Link className="text-white" href={CATALOG_ROUTE}>
              {translate.headerCatalog}
            </Link>

            <Link className="text-white" href={ABOUT_ROUTE}>
              {translate.headerAbout}
            </Link>

            <Link className="text-white" href={DELIVERY_ROUTE}>
              {translate.headerDelivery}
            </Link>

            <Link className="text-white" href={CONTACTS_ROUTE}>
              {translate.headerContacts}
            </Link>
          </div>
        </nav>

        <nav className="flex justify-between mb-[25px] gap-[46px] pt-[25px] lg:pt-0">
          <Link href={SHOP_ROUTE} className="flex items-center justify-center">
            <Image data-logo="desktop" src={logo} alt="logo" />

            <Image data-logo="mobile" src={logo2} alt="logo2" />
          </Link>

          <HeaderSearch
            isHidden={true}
            category={category}
            onSetCategory={onSetCategory}
            allCategories={categories}
          />

          <div className="hidden lg:flex gap-[25px]">
            <Link
              href={FAVORITE_ROUTER}
              className="flex flex-col items-center"
              onClick={() => handleClickButton(translate.messageHeaderFavorites)}
            >
              <Badge
                content={favorites?.length}
                color="danger"
                className={favoritesCounter}
              >
                <Icons id="whiteHeart" />
              </Badge>

              <span className="text-white">{translate.headerFavorites}</span>
            </Link>

            <Link
              href={CART_ROUTE}
              className="flex flex-col items-center"
              onClick={() => handleClickButton(translate.messageHeaderCart)}
            >
              <Badge
                content={cart?.order_products?.length}
                color="danger"
                className={cartCounter}
              >
                <Icons id="whiteCart" />
              </Badge>

              <span className="text-white">{translate.headerCart}</span>
            </Link>

            {returnHeaderElement(false)}
          </div>
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[45px] md:w-[44px] cursor-pointer"
            >
              <Icons id="burger" />
            </button>
          </div>
        </nav>

        <div className={burderMenuClass}>
          <nav className="flex items-start justify-between flex-wrap gap-[20px]">
            <div className="flex flex-col gap-[20px]">
              <Link href={CATALOG_ROUTE}>{translate.headerCatalog}</Link>

              <Link href={ABOUT_ROUTE}>{translate.headerAbout}</Link>

              <Link href={DELIVERY_ROUTE}>{translate.headerDelivery}</Link>

              <Link href={CONTACTS_ROUTE}>{translate.headerContacts}</Link>

              <Link href={`tel:${SHOP_PHONE}`}>{SHOP_PHONE}</Link>
            </div>

            {mapCategoriesOnPhone()}

            <div className="sm:hidden flex flex-wrap items-center gap-[20px]">
              {returnHeaderElement(true)}

              <Link
                href={FAVORITE_ROUTER}
                className="block flex items-center gap-[10px]"
                onClick={() => handleClickButton(translate.messageHeaderFavorites)}
              >
                <Badge
                  content={favorites?.length}
                  color="danger"
                  className={favoritesCounter}
                >
                  <Icons id="heart" />
                </Badge>

                <p>{translate.headerFavorites}</p>
              </Link>
              <button
                className="flex items-center gap-[10px]"
                onClick={() => setSearchModal(!searchModal)}
              >
                <Icons id="searchMobile" />

                <p>Поиск</p>
              </button>
              <Link
                className="flex items-center gap-[10px]"
                href={BASKET_ROUTE}
                onClick={() => handleClickButton(translate.messageHeaderCart)}
              >
                <Badge
                  content={cart?.order_products?.length}
                  color="danger"
                  className={cartCounter}
                >
                  <Icons id="shopping" />
                </Badge>

                <p>{translate.headerCart}</p>
              </Link>
              <LanguageSelect color="black" />
            </div>
          </nav>

          <div className="hidden sm:grid flex items-start gap-[24px] pl-[38px]">
            <div className="flex flex-wrap items-center gap-[20px]">
              {returnHeaderElement(true)}

              <Link
                href={FAVORITE_ROUTER}
                className="block"
                onClick={() => handleClickButton(translate.messageHeaderFavorites)}
              >
                <div className="flex items-center gap-[10px]">
                  <Badge
                    content={favorites?.length}
                    color="danger"
                    className={favoritesCounter}
                  >
                    <Icons id="heart" />
                  </Badge>

                  <p>{translate.headerFavorites}</p>
                </div>
              </Link>

              <button
                className="flex items-center gap-[10px]"
                onClick={() => setSearchModal(!searchModal)}
              >
                <Icons id="searchMobile" />

                <p>Поиск</p>
              </button>

              <Link
                className="flex items-center gap-[10px]"
                href={BASKET_ROUTE}
                onClick={() => handleClickButton(translate.messageHeaderCart)}
              >
                <Badge
                  content={cart?.order_products?.length}
                  color="danger"
                  className={cartCounter}
                >
                  <Icons id="shopping" />
                </Badge>

                <p>{translate.headerCart}</p>
              </Link>

              <LanguageSelect color="black" />
            </div>
          </div>
        </div>
      </div>

      {mapCategoriesOnDesktop()}

      <SearchModal
        isHidden={false}
        setSearchModal={setSearchModal}
        searchModal={searchModal}
        allCategories={categories}
        onSetCategory={onSetCategory}
        category={category}
      />
    </header>
  );
}
