# Generated by Django 4.1.4 on 2022-12-23 12:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserX',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blood_group', models.CharField(choices=[('a+', 'A+'), ('a-', 'A-'), ('b+', 'B+'), ('b-', 'B-'), ('o+', 'O+'), ('o-', 'o-'), ('ab+', 'AB+'), ('ab-', 'AB-')], max_length=10)),
                ('dob', models.DateField()),
                ('category', models.CharField(choices=[('1', 'Donor'), ('2', 'In Need')], max_length=500)),
                ('phone', models.CharField(max_length=100, unique=True)),
                ('district', models.CharField(choices=[('1', 'Bhojpur'), ('2', 'Dhankuta'), ('3', 'Ilam'), ('4', 'Jhapa'), ('5', 'Khotang'), ('6', 'Morang'), ('7', 'OkhaldhungaPanchthar'), ('8', 'Sankhuwasabha'), ('9', 'Solukhumbu'), ('10', 'Sunsari'), ('11', 'Taplejung'), ('12', 'Terhathum'), ('13', 'Udayapur'), ('14', 'Bara'), ('15', 'Dhanusa'), ('16', 'Mahottari'), ('17', 'Parsa'), ('18', 'Rautahat'), ('19', 'Saptari'), ('20', 'Sarlahi'), ('21', 'Siraha'), ('22', 'Bhaktapur District'), ('23', 'Chitwan'), ('24', 'Dhading'), ('25', 'Dolakha'), ('26', 'Kathmandu'), ('27', 'Kavrepalanchok'), ('28', 'Lalitpur'), ('29', 'Makawanpur'), ('30', 'Nuwakot District'), ('31', 'Ramechhap'), ('32', 'Rasuwa'), ('33', 'Sindhuli'), ('34', 'Sindhupalchok'), ('35', 'Baglung'), ('36', 'Gorkha'), ('37', 'Kaski'), ('38', 'Lamjung'), ('39', 'Manang'), ('40', 'Mustang'), ('41', 'Myagdi'), ('42', 'Nawalparasi (Bardaghat Susta Purva)'), ('43', 'Parbat'), ('44', 'Syangja'), ('45', 'Tanahu District'), ('46', 'Arghakhanchi'), ('47', 'Banke'), ('48', 'Bardiya'), ('49', 'Dang'), ('50', 'Gulmi'), ('51', 'Kapilvastu'), ('52', 'Nawalparasi (Bardaghat Susta Paschim)'), ('53', 'Palpa'), ('54', 'Pyuthan'), ('55', 'Rolpa'), ('56', 'Purbi Rukum'), ('57', 'Rupandehi'), ('58', 'Dailekh District'), ('59', 'Dolpa District'), ('60', 'Humla District'), ('61', 'Jajarkot District'), ('62', 'Jumla District'), ('63', 'Kalikot District'), ('64', 'Mugu District'), ('65', 'Rukum Paschim District'), ('66', 'Salyan District'), ('67', 'Surkhet District'), ('68', 'Achham'), ('69', 'Baitadi'), ('70', 'Bajhang'), ('71', 'Bajura'), ('72', 'Dadeldhura'), ('73', 'Darchula'), ('74', 'Doti'), ('75', 'Kailali'), ('76', 'Kanchanpur')], max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='BloodRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requested_blood', models.CharField(choices=[('a+', 'A+'), ('a-', 'A-'), ('b+', 'B+'), ('b-', 'B-'), ('o+', 'O+'), ('o-', 'o-'), ('ab+', 'AB+'), ('ab-', 'AB-')], max_length=10)),
                ('donation_status', models.BooleanField(default=False)),
                ('cancel_status', models.BooleanField(default=False)),
                ('blood_asker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blood_asker', to='base.userx')),
                ('blood_donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blood_donor', to='base.userx')),
            ],
        ),
    ]
