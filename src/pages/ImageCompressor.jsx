import React, {useState} from "react";
import InputField from "../components/InputField";
import PictureInfo from "../components/PictureInfo";
import ImageCompressorClass from 'image-compressor.js';

const ImageCompressor = () => {
    const [option, setOption] = useState({
        checkOrientation: true,
        maxWidth: '',
        maxHeight: '',
        minWidth: 0,
        minHeight: 0,
        width: '',
        height: '',
        quality: 0.8,
        mimeType: 'auto',
        convertSize: 5000000
    });
    const [oldPicture, setOldPicture] = useState({});
    const [newPicture, setNewPicture] = useState({});


    const handleOnChange = (e) => {
        const name = e.target.name;
        const tmp = {...option};

        if (e.target.type === 'checkbox')
            tmp[name] = e.target.checked === true ? true : false;
        else
            tmp[name] = e.target.value;

        setOption(tmp);
    };

    const handleChangePicture = (e) => {
        const file = e.target.files[0];

        if (file !== undefined) {
            const oldPictureInfo = pictureData(file);
            setOldPicture(oldPictureInfo);

            new ImageCompressorClass(file, {
                checkOrientation: option.checkOrientation ?? true,
                maxWidth: option.minWidth ?? '',
                maxHeight: option.minHeight ?? '',
                minWidth: option.minWidth ?? 0,
                minHeight: option.minHeight ?? 0,
                width: option.width ?? '',
                height: option.height ?? '',
                quality: option.quality ?? 0.8,
                mimeType: option.mimeType ?? 'auto',
                convertSize: option.convertSize ?? 500,
                success(result) {
                    const newPictureInfo = pictureData(result);
                    setNewPicture(newPictureInfo);
                },
                error(e) {
                    console.log(e.message);
                },
            });

        }
    };

    const getSize = (size) => {
        var kilobyte = 1024;
        var megabyte = kilobyte * kilobyte;

        if (size > megabyte) {
            return (size / megabyte).toFixed(2) + ' MB';
        } else if (size > kilobyte) {
            return (size / kilobyte).toFixed(2) + ' KB';
        } else if (size >= 0) {
            return size + ' B';
        }

        return 'N/A';
    };

    const pictureData = (file) => {
        return {
            name: file['name'],
            lastModified: file['lastModified'],
            lastModifiedDate: new Date().toLocaleString(),
            size: getSize(file['size']),
            type: file['type'],
            imageUrl: URL.createObjectURL(file),
        };
    };

    return (
        <div className='container'>
            <div className="uploadSection">

                <div className="file">
                    <input type="file" accept='image/*' name='picture' onChange={handleChangePicture} required/>
                </div>

                <InputField type="checkbox" name="checkOrientation" value={option.checkOrientation}
                            label="Check Orientation"
                            placeholder=""
                            onChange={handleOnChange}/>
                <InputField type='number' name='maxWidth' value={option.maxWidth} label='Max Width'
                            placeholder='Infinity'
                            onChange={handleOnChange}/>
                <InputField type='number' name='maxHeight' value={option.maxHeight} label='Max Height'
                            placeholder='Infinity'
                            onChange={handleOnChange}/>
                <InputField type='number' name='minWidth' value={option.minWidth} label='Min Width' placeholder='0'
                            onChange={handleOnChange}/>
                <InputField type='number' name='minHeight' value={option.minHeight} label='Min Height' placeholder='0'
                            onChange={handleOnChange}/>
                <InputField type='number' name='width' value={option.width} label='Width' placeholder='undefined'
                            onChange={handleOnChange}/>
                <InputField type='number' name='height' value={option.height} label='Height' placeholder='undefined'
                            onChange={handleOnChange}/>
                <InputField type='text' name='mimeType' value={option.mimeType} label='Mime Type' placeholder='auto'
                            onChange={handleOnChange}/>
                <InputField type='number' name='convertSize' value={option.convertSize} label='Convert Size'
                            placeholder='5000000'
                            onChange={handleOnChange}/>

                <div className="group-form" onChange={handleOnChange}>
                    <label>Quality</label>
                    <select name="quality" defaultValue="0.8">

                        {[0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.8, 0.9, 1].map((val, index) => (
                            <option key={index}>{val}</option>
                        ))}

                    </select>
                </div>

            </div>

            <div className="picturDescription grid">
                <PictureInfo title="Orginal Picture Details" data={oldPicture ?? ''}/>

                <PictureInfo title="Compressed Picture Details" data={newPicture ?? ''}/>
            </div>

        </div>
    )
};

export default ImageCompressor;