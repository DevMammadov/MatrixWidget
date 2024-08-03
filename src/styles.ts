export const mainStyles = `
    .max-horizontal-calendar {
         scrollbar-width: none;
         -ms-overflow-style: none;
    }

    .max-horizontal-calendar::-webkit-scrollbar {
        display: none;
    }

    .mtx-menu::after {
        width: 26px;
        height: 30px;
        content: "";
        position: absolute;
        top: 15%;
        right: -15px;
        transform: rotate(30deg) skewY(30deg);
        background: #fff;
        z-index: 1;
    }

    .mtx-menu::before {
        width: 26px;
        height: 30px;
        content: "";
        position: absolute;
        top: 15%;
        transform: rotate(30deg) skewY(30deg);
        right: -13px;
        background: linear-gradient(rgb(242, 242, 242) 37%, #f2f2f2);
        z-index: 2;
    }


    .active-tab::before,
    .active-tab::after {
        background: #333333
    }
`;
