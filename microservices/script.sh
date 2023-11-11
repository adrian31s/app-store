NAMESPACE='storeapp'
DATABASE='postgres_db.yaml'
APP_STORE='app-store.yaml'
APP_STORE_UI='app-store-ui.yaml'
CONFIG_MAP='configMap.yaml'
SENSITIVE_CONFIG_MAP='sensitive-services-config.yaml'

kubectl delete namespace $NAMESPACE #// uncomment in case of crash
kubectl create namespace $NAMESPACE

kubectl apply -f $CONFIG_MAP --namespace $NAMESPACE
kubectl apply -f $SENSITIVE_CONFIG_MAP --namespace $NAMESPACE
kubectl apply -f $DATABASE --namespace $NAMESPACE
kubectl apply -f $APP_STORE --namespace $NAMESPACE
kubectl apply -f $APP_STORE_UI --namespace $NAMESPACE

