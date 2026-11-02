// Vista: tienda mágica
'use strict';

function renderShop() {
  if (!state.grade) return renderEmptyGrade('shop');
  const progress = gradeProgress();
  return `<section class="page-top"><div><div class="eyebrow">Tienda mágica</div><h1>Dale tu toque mágico.</h1><p>Aprender da frutos. Canjea tus semillas y equipa a tu Cuy.</p></div><div class="shop-balance">${icon('seed')}<div>${progress.seeds}<small>semillas disponibles</small></div></div></section>
    <div class="shop-layout"><div class="shop-preview">${mascot('happy')}<h2>Tu compañero de aventuras</h2><p>${progress.equipped.length ? '¡Ese estilo sí tiene superpoderes!' : 'Su mejor accesorio siempre serán tus ganas de aprender.'}</p></div><div class="shop-products">${SHOP_DATA.map(item => {
      const owned = progress.owned.includes(item.id);
      const equipped = progress.equipped.includes(item.id);
      return `<article class="product ${equipped ? 'equipped' : ''}"><div class="product-art">${icon(item.icon)}</div><h2>${item.name}</h2><p>${equipped ? 'Equipado en tu FinanCuy.' : item.description}</p><button class="btn small ${owned ? 'secondary' : 'primary'}" data-action="shop-item" data-item="${item.id}" aria-label="${equipped ? 'Quitar' : owned ? 'Equipar' : 'Canjear'} ${item.name}${owned ? '' : ` por ${item.cost} semillas`}">${owned ? equipped ? 'Quitar accesorio' : 'Equipar' : `${icon('seed')}${item.cost} semillas`}</button></article>`;
    }).join('')}</div></div><p class="welcome-assurance">${icon('info')}Sin pagos reales. Semillas, vidas y accesorios se guardan por grado.</p>`;
}
