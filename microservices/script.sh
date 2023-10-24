NAMESPACE='storeapp'
DATABASE='postgres_db.yaml'
CONFIG_MAP='configMap.yaml'


# kubectl delete namespace $NAMESPACE // uncomment in case crash
kubectl create namespace $NAMESPACE

kubectl apply -f $CONFIG_MAP --namespace $NAMESPACE
kubectl apply -f $DATABASE --namespace $NAMESPACE