const key = '25186497-f0b65966427832fd654bcbd8e';
export function fetchImages(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`no image for ${name}`));
    })
    .then(response => response.hits);
}
