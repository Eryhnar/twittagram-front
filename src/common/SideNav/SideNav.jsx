import { NavButton } from "../NavButton/NavButton";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import "./SideNav.css";

export const SideNav = () => {
    return (
        <div className="sidenav">
            <NavButton title={
                <>
                    Home 
                    <span className="material-symbols-outlined">
                        home
                    </span>
                </>
            }
                path="/"
            />
            <NavButton title={
                <>
                    Find
                    <span className="material-symbols-outlined">
                        Search
                    </span>
                </>
            }
                path="/search"
            />
            {/* messages */}
            <NavButton title={
                <>
                    Messages
                    <span className="material-symbols-outlined">
                        Send
                    </span>
                </>
            }
                path="/messages"
            />
            {/* saved */}
            <NavButton title={
                <>
                    Saved
                    <span className="material-symbols-outlined">
                        Bookmark
                    </span>
                </>
            }
                path="/saved"
            />
            {/* my posts */}
            <NavButton title={
                <>
                    My Posts
                    <span className="material-symbols-outlined">
                        Photo_library
                    </span>
                </>
            }
                path="/myposts"
            />
            {/* profile */}
            <NavButton title={
                <>
                    Profile
                    <span className="material-symbols-outlined">
                        Account_circle
                    </span>
                </>
            }
                path="/profile"
            />
            <ToggleButton />
            light/dark mode
        </div>
    );
}