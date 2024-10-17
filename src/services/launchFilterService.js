const DEFAULT_MIN_IMAGE_COUNT = 4;

export const getSpaceXLaunchesWithFlickrImages = (data, minAmount = DEFAULT_MIN_IMAGE_COUNT) =>  {
    return data.filter(launch => {
        
        if (!launch.links || !launch.links.flickr) {
            return false
        }

        return launch.links.flickr.original.length >= minAmount;
    }  
);
}