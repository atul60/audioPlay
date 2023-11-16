type TFileType = React.ChangeEvent<HTMLInputElement>;
type THandleFileChange = (event: TFileType) => void;
type THandleTimeUpdate = () => any;

export {TFileType, THandleFileChange, THandleTimeUpdate};