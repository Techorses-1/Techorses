import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    FaCode,
    FaCogs,
    FaBullhorn,
    FaPaintBrush,
    FaPenNib,
    FaMobileAlt,
    FaUserTie,
    FaCertificate
} from "react-icons/fa";
import "./BottomServiceBar.scss";

const BottomServiceBar = () => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const services = [
        {
            icon: <FaCode />,
            label: "Website",
            path: "/website",
            hasDropdown: true,
            dropdownItems: [
                {
                    icon: <FaUserTie />,
                    label: "Direct Clients",
                    path: "/website",
                    state: { type: 'direct' }
                },
                {
                    icon: <FaCertificate />,
                    label: "White Labels",
                    path: "/website",
                    state: { type: 'whitelabel' }
                }
            ]
        },
        {
            icon: <FaCogs />,
            label: "Software",
            path: "/custom-software",
            hasDropdown: true,                      // 👈 ADDED
            dropdownItems: [                         // 👈 ADDED
                {
                    icon: <FaUserTie />,
                    label: "Direct Clients",
                    path: "/custom-software",
                    state: { type: 'direct' }
                },
                {
                    icon: <FaCertificate />,
                    label: "White Labels",
                    path: "/custom-software",
                    state: { type: 'whitelabel' }
                }
            ]
        },
        { icon: <FaBullhorn />, label: "Marketing", path: "/marketing" },
        { icon: <FaPaintBrush />, label: "Graphic", path: "/graphicdesign" },
        { icon: <FaPenNib />, label: "UI/UX", path: "/uiux" },
        // { icon: <FaMobileAlt />, label: "Mobile", path: "/mobile" },
    ];

    const handleServiceClick = (e, service) => {
        if (service.hasDropdown) {
            e.preventDefault();
            if (activeDropdown === service.label) {
                setDropdownOpen(!dropdownOpen);
            } else {
                setActiveDropdown(service.label);
                setDropdownOpen(true);
            }
        }
    };

    const handleDropdownItemClick = () => {
        setDropdownOpen(false);
        setActiveDropdown(null);
    };

    const handleRegularLinkClick = () => {
        setDropdownOpen(false);
        setActiveDropdown(null);
    };

    return (
        <div className="bottom-service-bar-container" ref={dropdownRef}>
            {/* Dynamic Dropdown Menu - Appears above the bottom bar */}
            {dropdownOpen && activeDropdown && (
                <div className="mobile-dropdown-menu">
                    {services
                        .find(s => s.label === activeDropdown)
                        ?.dropdownItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                state={item.state}
                                className="mobile-dropdown-item"
                                onClick={handleDropdownItemClick}
                            >
                                <span className="dropdown-icon">{item.icon}</span>
                                <span className="dropdown-label">{item.label}</span>
                            </Link>
                        ))}
                </div>
            )}

            <div className="bottom-service-bar">
                {services.map((service, idx) => (
                    <Link
                        to={service.hasDropdown ? "#" : service.path}
                        key={idx}
                        className={`service-item ${location.pathname === service.path ? 'active' : ''} 
                            ${service.hasDropdown ? 'has-dropdown' : ''} 
                            ${activeDropdown === service.label && dropdownOpen ? 'dropdown-active' : ''}`}
                        onClick={(e) => {
                            if (service.hasDropdown) {
                                handleServiceClick(e, service);
                            } else {
                                handleRegularLinkClick();
                            }
                        }}
                    >
                        <div className="icon">
                            {service.icon}
                        </div>
                        <div className="label">{service.label}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomServiceBar;