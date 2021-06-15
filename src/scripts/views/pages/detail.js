import UrlParser from '../../routes/url-parser';
import CrowdRestoDataSource from '../../data/crowd-resto-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
        <div id="resto" class="resto"></div>
        <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await CrowdRestoDataSource.detailResto(url.id);
    const restoContainer = document.querySelector('#resto');
    restoContainer.innerHTML = createRestoDetailTemplate(resto);

    // const likeButtonContainer = document.querySelector('#likeButtonContainer');
    // likeButtonContainer.innerHTML = createLikeButton();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: resto.id,
        pictureId: resto.pictureId,
        name: resto.name,
        city: resto.city,
        description: resto.description,
      },
    });
  },
};

export default Detail;
