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

@keyframes wave-animation {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    .wave-animation {
        position: "relative"
    }

    .wave-animation::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border: 2px solid rgb(35, 168, 51);
            background: transparent;
            height: 100%;
            width: 100%;
            border-radius: 50%;
            animation: wave-animation 2s cubic-bezier(0.37, 0, 0.8, 0.77) infinite;
    }

    @keyframes fade-in {
    0% {
         opacity: 0;
        }
    100% {
         opacity: 1;
        }
    }

    .fade-in {
        animation: fade-in 0.1s ease-out 0s;
    }
`;
