const Logo = () => {
    return (
        <div className="flex align-middle gap-3 items-center">
            <img src="./brain.png" alt="RemeberIt Logo" className="w-14 h-14" />
            <p className=" text-4xl bg-gradient-to-tr bg-clip-text from-violet-700 via-violet-400 to-violet-800 text-transparent ">
                RememberIt
            </p>
        </div>
    );
};

export default Logo;
