import json

import boto3


def ListFiles(bucket_name, prefix):
    """List files in specific S3 URL"""
    print(bucket_name)
    print(prefix)
    #for content in response.get('Contents', []):
    #    yield content.get('Key')

    s3 = boto3.client('s3')
    try:
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix + "/")

    except Exception as e:
        return None
    return response['Contents']



def reknonizeCompare(bucket_name, photoName, labels):
    data = {}
    client = boto3.client('rekognition')
    ####WORKS
    # bucket_name = 'devnet-security-event-images'
    # photoName = '1b6ac73e-58cc-4817-a4fb-859ba5e43cd5.jpeg'
    # photoName = 'teste/cs1.jpg'
    # photoName = 'images_www.cilnet.pt/1b6ac73e-58cc-4817-a4fb-859ba5e43cd5.jpeg'

    # bucket_name = 'blocked-site-images'
    print(bucket_name)
    print(photoName)
    response = client.detect_labels(Image={'S3Object': {'Bucket': bucket_name, 'Name': photoName}},
                                    MaxLabels=10)

    print('Detected labels for ' + photoName)
    print(response)
    for label in response['Labels']:
        # print("Label: " + label['Name'])
        # print("Confidence: " + str(label['Confidence']))
        # print("Instances:")

        if (label['Name'] in labels):
            print("FINDDDDDDDDDDDDDDdddd")
            data['key'] = photoName
            data['label'] = label['Name']
            data['confidence'] = label['Confidence']
    return data


def callPost(bucket_name, prefix):
    # BUCKET_NAME = 'blocked-site-images'
    # PREFIX = 'images_www.sapo.pt/'


    file_list = ListFiles(bucket_name, prefix)
    print('file_list')
    print(file_list)
    image_format_list = ['.jpg', '.jpeg']
    jpg = '.jpg'
    jpeg = '.jpeg'
    my_list = []
    labels = ['Weapon', 'Gun', 'Weaponry']
    for obj in file_list:
        file = obj["Key"]
        #print(file)
        if (jpg in file) or (jpeg in file):
        #if (file in image_format_list[0]):
            print('image_format_list')
            print(file)
            my_list.append(reknonizeCompare(bucket_name, file, labels))
            print(my_list)


    jsonList = json.dumps(my_list)
    print(jsonList)
    return jsonList
