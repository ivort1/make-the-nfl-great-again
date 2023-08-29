export default function Tab({ css, text, onClick }) {    
    return(
        <button className={`${css} flex items-center justify-center h-9 w-1/3 font-semibold px-4 py-2 rounded-2xl`} onClick={onClick}>{text}</button>
    );
}