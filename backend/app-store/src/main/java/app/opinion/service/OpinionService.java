package app.opinion.service;

import app.opinion.dao.OpinionDao;
import app.opinion.model.Opinion;
import app.product.model.Product;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class OpinionService {
    private final OpinionDao opinionDao;

    @Inject
    public OpinionService(OpinionDao opinionDao) {
        this.opinionDao = opinionDao;
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public void addOpinion(String username, Product product, Float rate, String comment) {
        Opinion opinion = new Opinion();
        opinion.setComment(comment);
        opinion.setRate(rate);
        opinion.setProduct(product);
        opinion.setUsername(username);
        opinionDao.createEntity(opinion);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public void removeOpinion(String username, Long opinionId) {
        opinionDao.deleteByUsernameAndId(username, opinionId);
    }
}
