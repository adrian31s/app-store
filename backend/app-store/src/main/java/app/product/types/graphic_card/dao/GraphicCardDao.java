package app.product.types.graphic_card.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.types.graphic_card.model.GraphicCard;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GraphicCardDao extends BaseDao<GraphicCard> {
    @Override
    public Class<GraphicCard> getClazz() {
        return GraphicCard.class;
    }
}
