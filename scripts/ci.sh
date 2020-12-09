#!/bin/bash

app_name="course_guopi";
ref_name='guopi-web@0.0.0';
commiter_email=$(git show -s --format='%an' $4)
commiter=${commiter_email#@*}

# 获取分支名
while [[ $# -gt 1 ]]
do
  key="$1"

  case $key in
    -r | -ref)
    ref_name="$2"
    shift # past argument
    ;;
  esac
    shift # past argument or value
done

#==========================================
#  构建工作。。。
#==========================================

sub_app_name=`echo $ref_name | sed 's/^guopi-\([0-9a-zA-Z]\{1,\}\)@.*$/\1/g'` # 应用名称
app_version=`echo $ref_name | sed 's/guopi-[0-9a-zA-Z]\{1,\}@/v/g'` # 应用版本
pack_time=`date +'%Y-%m-%d-%H%M%S'`
file_name="$app_name-[$commiter]-$ref_name-$pack_time.tgz"

export REACT_APP_VERSION="$ref_name-$pack_time"

NODE_OPTIONS="--max-old-space-size=8192 UV_THREADPOOL_SIZE=8" WEB_VERSION=$app_version yarn build:$sub_app_name

cd apps/$sub_app_name

rm -rf ./dist
rm -rf ./pkgs
mkdir -p dist
mkdir -p pkgs

cp -r build dist/
cp -r ./conf dist/
# cp -r ./package.json dist/
cp -r ./server/package.json dist/
cp -r ./Procfile dist/
cp -r ./server dist/

cd dist
tar -czf $file_name *
cd ..
mv dist/$file_name pkgs
rm -rf ./dist

#==========================================
#  发布到 UAE
#==========================================
web_uae_ids=('94' '112')

uae_ids=()

case $sub_app_name in
  web)
    uae_ids=${web_uae_ids[*]}
  ;;
esac

for uae_id in ${uae_ids[*]}
do
  upload2uae -pkg_path ./pkgs -app_id $uae_id
done

