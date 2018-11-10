cd ../build
gsutil mb gs://dict-sample
gsutil rsync -R . gs://dict-sample
 gsutil iam ch allUsers:objectViewer gs://itpr-dict
